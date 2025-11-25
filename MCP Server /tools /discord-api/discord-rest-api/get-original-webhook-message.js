/**
 * Function to get the original webhook message from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} [args.thread_id=null] - The ID of the thread (optional).
 * @returns {Promise<Object>} - The original message retrieved from the webhook.
 */
const executeFunction = async ({ webhook_id, webhook_token, thread_id = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/webhooks/${webhook_id}/${webhook_token}/messages/@original`);
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
    console.error('Error getting original webhook message:', error);
    return {
      error: `An error occurred while getting the original webhook message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the original webhook message from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_original_webhook_message',
      description: 'Retrieve the initial interaction response from a webhook.',
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
          thread_id: {
            type: 'string',
            description: 'The ID of the thread (optional).'
          }
        },
        required: ['webhook_id', 'webhook_token']
      }
    }
  }
};

export { apiTool };