/**
 * Function to delete a member from a guild in Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.guild_id - The ID of the guild from which to remove the member.
 * @param {string} args.user_id - The ID of the user to remove from the guild.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ guild_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/members/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
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
    return { message: 'Member deleted successfully.' };
  } catch (error) {
    console.error('Error deleting guild member:', error);
    return {
      error: `An error occurred while deleting the guild member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild member in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_member',
      description: 'Remove a member from a guild in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild from which to remove the member.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to remove from the guild.'
          }
        },
        required: ['guild_id', 'user_id']
      }
    }
  }
};

export { apiTool };