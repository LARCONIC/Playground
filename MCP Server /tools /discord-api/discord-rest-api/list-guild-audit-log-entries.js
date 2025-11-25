/**
 * Function to list audit log entries for a Discord guild.
 *
 * @param {Object} args - Arguments for the audit log request.
 * @param {string} args.guild_id - The ID of the guild to retrieve audit logs for.
 * @param {string|null} [args.user_id=null] - The ID of the user to filter the audit logs by.
 * @param {number|null} [args.action_type=null] - The action type to filter the audit logs by.
 * @param {string|null} [args.before=null] - Get entries before this timestamp.
 * @param {string|null} [args.after=null] - Get entries after this timestamp.
 * @param {number|null} [args.limit=null] - The maximum number of entries to return.
 * @returns {Promise<Object>} - The result of the audit log request.
 */
const executeFunction = async ({ guild_id, user_id = null, action_type = null, before = null, after = null, limit = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}/audit-logs`);
    if (user_id) url.searchParams.append('user_id', user_id);
    if (action_type) url.searchParams.append('action_type', action_type);
    if (before) url.searchParams.append('before', before);
    if (after) url.searchParams.append('after', after);
    if (limit) url.searchParams.append('limit', limit);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing guild audit log entries:', error);
    return {
      error: `An error occurred while listing guild audit log entries: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing guild audit log entries on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_audit_log_entries',
      description: 'List audit log entries for a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to retrieve audit logs for.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to filter the audit logs by.'
          },
          action_type: {
            type: 'integer',
            description: 'The action type to filter the audit logs by.'
          },
          before: {
            type: 'string',
            description: 'Get entries before this timestamp.'
          },
          after: {
            type: 'string',
            description: 'Get entries after this timestamp.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of entries to return.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };