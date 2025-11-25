/**
 * Function to start a prune operation on a Discord guild.
 *
 * @param {Object} args - Arguments for the prune operation.
 * @param {string} args.guild_id - The ID of the guild to prune.
 * @returns {Promise<Object>} - The result of the prune operation.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/prune`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error starting prune operation:', error);
    return {
      error: `An error occurred while starting the prune operation: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for starting a prune operation on a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'prune_guild',
      description: 'Start a prune operation on a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to prune.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };