/**
 * Function to retrieve a previously-sent webhook message from Discord.
 *
 * @param {Object} args - Arguments for the message retrieval.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} args.message_id - The ID of the message to retrieve.
 * @param {string} [args.thread_id=null] - The ID of the thread, if applicable.
 * @returns {Promise<Object>} - The result of the webhook message retrieval.
 */
const executeFunction = async ({ webhook_id, webhook_token, message_id, thread_id = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path parameters
    const url = new URL(`${baseUrl}/webhooks/${webhook_id}/${webhook_token}/messages/${message_id}`);
    if (thread_id) {
      url.searchParams.append('thread_id', thread_id);
    }

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving webhook message:', error);
    return {
      error: `An error occurred while retrieving the webhook message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving webhook messages from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_webhook_message',
      description: 'Retrieve a previously-sent webhook message from Discord.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook.'
          },
          webhook_token: {
            type: 'string',
            description: 'The token of the webhook.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to retrieve.'
          },
          thread_id: {
            type: 'string',
            description: 'The ID of the thread, if applicable.'
          }
        },
        required: ['webhook_id', 'webhook_token', 'message_id']
      }
    }
  }
};

export { apiTool };