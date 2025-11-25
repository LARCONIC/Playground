/**
 * Function to retrieve a scheduled event in a Discord guild.
 *
 * @param {Object} args - Arguments for the scheduled event retrieval.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.guild_scheduled_event_id - The ID of the scheduled event.
 * @param {boolean|null} [args.with_user_count=null] - Whether to include the user count in the response.
 * @returns {Promise<Object>} - The result of the scheduled event retrieval.
 */
const executeFunction = async ({ guild_id, guild_scheduled_event_id, with_user_count = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables and query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}/scheduled-events/${guild_scheduled_event_id}`);
    if (with_user_count !== null) {
      url.searchParams.append('with_user_count', with_user_count);
    }

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
    console.error('Error retrieving scheduled event:', error);
    return {
      error: `An error occurred while retrieving the scheduled event: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a scheduled event in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_scheduled_event',
      description: 'Retrieve a scheduled event in the guild.',
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
          with_user_count: {
            type: 'boolean',
            description: 'Whether to include the user count in the response.'
          }
        },
        required: ['guild_id', 'guild_scheduled_event_id']
      }
    }
  }
};

export { apiTool };