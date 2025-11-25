/**
 * Function to delete all reactions on a specific message in a Discord channel.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.channel_id - The ID of the channel containing the message.
 * @param {string} args.message_id - The ID of the message from which to delete reactions.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ channel_id, message_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}/reactions`;

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

    // Return a success message or the response data
    return { message: 'All reactions deleted successfully.' };
  } catch (error) {
    console.error('Error deleting reactions:', error);
    return {
      error: `An error occurred while deleting reactions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting all message reactions in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_all_message_reactions',
      description: 'Delete all reactions on a specific message in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel containing the message.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message from which to delete reactions.'
          }
        },
        required: ['channel_id', 'message_id']
      }
    }
  }
};

export { apiTool };