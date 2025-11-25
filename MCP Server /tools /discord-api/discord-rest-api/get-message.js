/**
 * Function to retrieve a message from a Discord channel.
 *
 * @param {Object} args - Arguments for the message retrieval.
 * @param {string} args.channel_id - The ID of the channel from which to retrieve the message.
 * @param {string} args.message_id - The ID of the message to retrieve.
 * @returns {Promise<Object>} - The result of the message retrieval.
 */
const executeFunction = async ({ channel_id, message_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving message:', error);
    return {
      error: `An error occurred while retrieving the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a message from a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_message',
      description: 'Retrieve a message from a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel from which to retrieve the message.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to retrieve.'
          }
        },
        required: ['channel_id', 'message_id']
      }
    }
  }
};

export { apiTool };