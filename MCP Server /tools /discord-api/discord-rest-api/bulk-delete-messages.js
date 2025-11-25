/**
 * Function to bulk delete messages in a Discord channel.
 *
 * @param {Object} args - Arguments for the bulk delete operation.
 * @param {string} args.channel_id - The ID of the channel from which to delete messages.
 * @param {Array<string>} args.messages - An array of message IDs to delete.
 * @returns {Promise<Object>} - The result of the bulk delete operation.
 */
const executeFunction = async ({ channel_id, messages }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the bulk delete endpoint
    const url = `${baseUrl}/channels/${channel_id}/messages/bulk-delete`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ messages });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the response data
    return await response.json();
  } catch (error) {
    console.error('Error bulk deleting messages:', error);
    return {
      error: `An error occurred while bulk deleting messages: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for bulk deleting messages in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'bulk_delete_messages',
      description: 'Bulk delete messages in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel from which to delete messages.'
          },
          messages: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of message IDs to delete.'
          }
        },
        required: ['channel_id', 'messages']
      }
    }
  }
};

export { apiTool };