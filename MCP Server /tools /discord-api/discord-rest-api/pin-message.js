/**
 * Function to pin a message in a Discord channel.
 *
 * @param {Object} args - Arguments for pinning the message.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message to be pinned.
 * @returns {Promise<Object>} - The result of the pinning operation.
 */
const executeFunction = async ({ channel_id, message_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/channels/${channel_id}/pins/${message_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
      'Accept': 'application/json'
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

    // Return the response data (204 No Content means no body)
    return { status: 'Message pinned successfully' };
  } catch (error) {
    console.error('Error pinning message:', error);
    return {
      error: `An error occurred while pinning the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for pinning a message in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'pin_message',
      description: 'Pin a message in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to be pinned.'
          }
        },
        required: ['channel_id', 'message_id']
      }
    }
  }
};

export { apiTool };