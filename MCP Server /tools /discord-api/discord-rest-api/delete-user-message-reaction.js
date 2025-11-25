/**
 * Function to delete a user's reaction to a message in a Discord channel.
 *
 * @param {Object} args - Arguments for the delete reaction request.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message to remove the reaction from.
 * @param {string} args.emoji_name - The name of the emoji used for the reaction.
 * @param {string} args.user_id - The ID of the user whose reaction is to be removed.
 * @returns {Promise<Object>} - The result of the delete reaction request.
 */
const executeFunction = async ({ channel_id, message_id, emoji_name, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}/reactions/${emoji_name}/${user_id}`;

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

    // Return a success message
    return { message: 'Reaction deleted successfully.' };
  } catch (error) {
    console.error('Error deleting user message reaction:', error);
    return {
      error: `An error occurred while deleting the reaction: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a user's message reaction on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_user_message_reaction',
      description: 'Delete a user\'s reaction to a message in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to remove the reaction from.'
          },
          emoji_name: {
            type: 'string',
            description: 'The name of the emoji used for the reaction.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user whose reaction is to be removed.'
          }
        },
        required: ['channel_id', 'message_id', 'emoji_name', 'user_id']
      }
    }
  }
};

export { apiTool };