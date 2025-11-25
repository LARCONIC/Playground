/**
 * Function to retrieve ban details for a user in a Discord guild.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.user_id - The ID of the user to retrieve ban details for.
 * @returns {Promise<Object>} - The result of the ban retrieval.
 */
const executeFunction = async ({ guild_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/bans/${user_id}`;

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
    console.error('Error retrieving ban details:', error);
    return {
      error: `An error occurred while retrieving ban details: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving ban details for a user in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_ban',
      description: 'Retrieve ban details for a user in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to retrieve ban details for.'
          }
        },
        required: ['guild_id', 'user_id']
      }
    }
  }
};

export { apiTool };