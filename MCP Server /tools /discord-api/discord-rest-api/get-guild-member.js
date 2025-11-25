/**
 * Function to get a guild member from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.user_id - The ID of the user.
 * @returns {Promise<Object>} - The guild member object for the specified user in the guild.
 */
const executeFunction = async ({ guild_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/guilds/${guild_id}/members/${user_id}`;

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
    console.error('Error getting guild member:', error);
    return {
      error: `An error occurred while getting the guild member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting a guild member from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_member',
      description: 'Retrieve the guild member object for a user in the specified guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user.'
          }
        },
        required: ['guild_id', 'user_id']
      }
    }
  }
};

export { apiTool };