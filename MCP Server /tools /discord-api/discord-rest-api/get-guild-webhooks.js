/**
 * Function to get webhooks for a specific guild in Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild to fetch webhooks from.
 * @returns {Promise<Object>} - The response containing the list of webhooks.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/webhooks`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error getting guild webhooks:', error);
    return {
      error: `An error occurred while getting guild webhooks: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting guild webhooks in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_webhooks',
      description: 'Get webhooks for a specific guild in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to fetch webhooks from.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };