/**
 * Function to delete a reaction from a message for the current user on Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message from which to delete the reaction.
 * @param {string} args.emoji_name - The name of the emoji used for the reaction.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ channel_id, message_id, emoji_name }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}/reactions/${emoji_name}/@me`;

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

    // Return a success message or empty response
    return { message: 'Reaction deleted successfully' };
  } catch (error) {
    console.error('Error deleting reaction:', error);
    return {
      error: `An error occurred while deleting the reaction: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a message reaction on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_my_message_reaction',
      description: 'Delete a reaction on a message for the current user.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message from which to delete the reaction.'
          },
          emoji_name: {
            type: 'string',
            description: 'The name of the emoji used for the reaction.'
          }
        },
        required: ['channel_id', 'message_id', 'emoji_name']
      }
    }
  }
};

export { apiTool };