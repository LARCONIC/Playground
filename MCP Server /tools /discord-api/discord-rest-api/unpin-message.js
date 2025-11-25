/**
 * Function to unpin a message in a Discord channel.
 *
 * @param {Object} args - Arguments for the unpin message operation.
 * @param {string} args.channel_id - The ID of the channel where the message is pinned.
 * @param {string} args.message_id - The ID of the message to unpin.
 * @returns {Promise<Object>} - The result of the unpin operation.
 */
const executeFunction = async ({ channel_id, message_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the unpin message request
    const url = `${baseUrl}/channels/${channel_id}/pins/${message_id}`;

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

    // Return success response
    return { message: 'Message unpinned successfully.' };
  } catch (error) {
    console.error('Error unpinning message:', error);
    return {
      error: `An error occurred while unpinning the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for unpinning a message in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'unpin_message',
      description: 'Unpin a message in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is pinned.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to unpin.'
          }
        },
        required: ['channel_id', 'message_id']
      }
    }
  }
};

export { apiTool };