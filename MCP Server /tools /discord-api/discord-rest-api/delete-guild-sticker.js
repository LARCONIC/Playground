/**
 * Function to delete a sticker in a guild on Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.guild_id - The ID of the guild where the sticker is located.
 * @param {string} args.sticker_id - The ID of the sticker to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ guild_id, sticker_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/guilds/${guild_id}/stickers/${sticker_id}`;

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

    // Return a success message for successful deletion
    return { message: 'Sticker deleted successfully.' };
  } catch (error) {
    console.error('Error deleting guild sticker:', error);
    return {
      error: `An error occurred while deleting the sticker: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild sticker on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_sticker',
      description: 'Delete a sticker in a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the sticker is located.'
          },
          sticker_id: {
            type: 'string',
            description: 'The ID of the sticker to delete.'
          }
        },
        required: ['guild_id', 'sticker_id']
      }
    }
  }
};

export { apiTool };