/**
 * Function to delete an emoji from a guild in Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.guild_id - The ID of the guild from which to delete the emoji.
 * @param {string} args.emoji_id - The ID of the emoji to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ guild_id, emoji_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/guilds/${guild_id}/emojis/${emoji_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
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

    // Return a success message for a successful deletion
    return { message: 'Emoji deleted successfully.' };
  } catch (error) {
    console.error('Error deleting guild emoji:', error);
    return {
      error: `An error occurred while deleting the emoji: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild emoji in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_emoji',
      description: 'Delete an emoji from a guild in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild from which to delete the emoji.'
          },
          emoji_id: {
            type: 'string',
            description: 'The ID of the emoji to delete.'
          }
        },
        required: ['guild_id', 'emoji_id']
      }
    }
  }
};

export { apiTool };