/**
 * Function to delete all message reactions by emoji on Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message from which to delete reactions.
 * @param {string} args.emoji_name - The name of the emoji for which to delete reactions.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ channel_id, message_id, emoji_name }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user

  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}/reactions/${emoji_name}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
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

    // Return success message or response
    return { message: 'Reactions deleted successfully.' };
  } catch (error) {
    console.error('Error deleting reactions:', error);
    return {
      error: `An error occurred while deleting reactions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting all message reactions by emoji on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_all_message_reactions_by_emoji',
      description: 'Delete all reactions on the message for a given emoji.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message from which to delete reactions.'
          },
          emoji_name: {
            type: 'string',
            description: 'The name of the emoji for which to delete reactions.'
          }
        },
        required: ['channel_id', 'message_id', 'emoji_name']
      }
    }
  }
};

export { apiTool };