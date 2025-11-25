/**
 * Function to list channels in a Discord guild.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild (server) to list channels from.
 * @returns {Promise<Object>} - The response containing the list of channels or an error message.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/channels`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
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
    console.error('Error listing guild channels:', error);
    return {
      error: `An error occurred while listing guild channels: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing channels in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_channels',
      description: 'List channels in a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild (server) to list channels from.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };