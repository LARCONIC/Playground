/**
 * Function to list user bans for a specific guild on Discord.
 *
 * @param {Object} args - Arguments for the ban list.
 * @param {string} args.guild_id - The ID of the guild to list bans from.
 * @param {number} [args.limit] - The maximum number of bans to return.
 * @param {string} [args.before] - Get bans before this user ID.
 * @param {string} [args.after] - Get bans after this user ID.
 * @returns {Promise<Object>} - The result of the ban list request.
 */
const executeFunction = async ({ guild_id, limit, before, after }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}/bans`);
    if (limit) url.searchParams.append('limit', limit);
    if (before) url.searchParams.append('before', before);
    if (after) url.searchParams.append('after', after);

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
    console.error('Error listing guild bans:', error);
    return {
      error: `An error occurred while listing guild bans: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing user bans in a guild on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_bans',
      description: 'List user bans for a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to list bans from.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of bans to return.'
          },
          before: {
            type: 'string',
            description: 'Get bans before this user ID.'
          },
          after: {
            type: 'string',
            description: 'Get bans after this user ID.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };