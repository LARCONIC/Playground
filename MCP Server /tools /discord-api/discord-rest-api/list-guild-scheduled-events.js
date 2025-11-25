/**
 * Function to list scheduled events in a Discord guild.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild to list scheduled events for.
 * @param {boolean} [args.with_user_count=null] - Whether to include user count in the response.
 * @returns {Promise<Object>} - The list of scheduled events in the guild.
 */
const executeFunction = async ({ guild_id, with_user_count = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}/scheduled-events`);
    if (with_user_count !== null) {
      url.searchParams.append('with_user_count', with_user_count.toString());
    }

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
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
    console.error('Error listing guild scheduled events:', error);
    return {
      error: `An error occurred while listing guild scheduled events: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing scheduled events in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_scheduled_events',
      description: 'List scheduled events in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to list scheduled events for.'
          },
          with_user_count: {
            type: 'boolean',
            description: 'Whether to include user count in the response.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };