/**
 * Function to list roles in a Discord guild.
 *
 * @param {Object} args - Arguments for the role listing.
 * @param {string} args.guild_id - The ID of the guild to list roles from.
 * @returns {Promise<Object>} - The result of the role listing.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/roles`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
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
    console.error('Error listing guild roles:', error);
    return {
      error: `An error occurred while listing guild roles: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing roles in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_roles',
      description: 'List roles in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to list roles from.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };