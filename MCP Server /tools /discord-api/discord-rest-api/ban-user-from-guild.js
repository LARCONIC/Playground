/**
 * Function to ban a user from a Discord guild.
 *
 * @param {Object} args - Arguments for banning a user.
 * @param {string} args.guild_id - The ID of the guild from which to ban the user.
 * @param {string} args.user_id - The ID of the user to ban.
 * @returns {Promise<Object>} - The result of the ban operation.
 */
const executeFunction = async ({ guild_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/bans/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the response data
    return {
      status: response.status,
      message: 'User banned successfully.'
    };
  } catch (error) {
    console.error('Error banning user from guild:', error);
    return {
      error: `An error occurred while banning the user: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for banning a user from a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'ban_user_from_guild',
      description: 'Ban a user from a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild from which to ban the user.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to ban.'
          }
        },
        required: ['guild_id', 'user_id']
      }
    }
  }
};

export { apiTool };