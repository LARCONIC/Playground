/**
 * Function to list users subscribed to a guild scheduled event on Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.guild_scheduled_event_id - The ID of the scheduled event.
 * @param {boolean} [args.with_member=null] - Whether to include member data.
 * @param {number} [args.limit=null] - The maximum number of users to return.
 * @param {string} [args.before=null] - Get users before this user ID.
 * @param {string} [args.after=null] - Get users after this user ID.
 * @returns {Promise<Object>} - The result of the API call.
 */
const executeFunction = async ({ guild_id, guild_scheduled_event_id, with_member = null, limit = null, before = null, after = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}/scheduled-events/${guild_scheduled_event_id}/users`);
    if (with_member !== null) url.searchParams.append('with_member', with_member);
    if (limit !== null) url.searchParams.append('limit', limit);
    if (before !== null) url.searchParams.append('before', before);
    if (after !== null) url.searchParams.append('after', after);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
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
    console.error('Error listing guild scheduled event users:', error);
    return {
      error: `An error occurred while listing guild scheduled event users: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing users subscribed to a guild scheduled event on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_scheduled_event_users',
      description: 'List users subscribed to a guild scheduled event.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          guild_scheduled_event_id: {
            type: 'string',
            description: 'The ID of the scheduled event.'
          },
          with_member: {
            type: 'boolean',
            description: 'Whether to include member data.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of users to return.'
          },
          before: {
            type: 'string',
            description: 'Get users before this user ID.'
          },
          after: {
            type: 'string',
            description: 'Get users after this user ID.'
          }
        },
        required: ['guild_id', 'guild_scheduled_event_id']
      }
    }
  }
};

export { apiTool };