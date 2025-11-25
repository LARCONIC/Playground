/**
 * Function to unban a user from a Discord guild.
 *
 * @param {Object} args - Arguments for the unban operation.
 * @param {string} args.guild_id - The ID of the guild from which to unban the user.
 * @param {string} args.user_id - The ID of the user to unban.
 * @returns {Promise<Object>} - The result of the unban operation.
 */
const executeFunction = async ({ guild_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/guilds/${guild_id}/bans/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return a success message
    return { message: 'User unbanned successfully.' };
  } catch (error) {
    console.error('Error unbanning user from guild:', error);
    return {
      error: `An error occurred while unbanning the user: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for unbanning a user from a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'unban_user_from_guild',
      description: 'Unban a user from a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild from which to unban the user.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to unban.'
          }
        },
        required: ['guild_id', 'user_id']
      }
    }
  }
};

export { apiTool };