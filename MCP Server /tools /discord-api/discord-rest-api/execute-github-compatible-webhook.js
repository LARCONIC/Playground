/**
 * Function to execute a GitHub compatible webhook on Discord.
 *
 * @param {Object} args - Arguments for the webhook execution.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {Object} args.payload - The payload to send to the webhook.
 * @param {boolean} [args.wait=null] - Whether to wait for the webhook to finish processing.
 * @param {string} [args.thread_id=null] - The ID of the thread to send the message in.
 * @returns {Promise<Object>} - The result of the webhook execution.
 */
const executeWebhook = async ({ webhook_id, webhook_token, payload, wait = null, thread_id = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user

  try {
    // Construct the URL with path variables and query parameters
    const url = new URL(`${baseUrl}/webhooks/${webhook_id}/${webhook_token}/github`);
    if (wait !== null) url.searchParams.append('wait', wait);
    if (thread_id !== null) url.searchParams.append('thread_id', thread_id);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
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
    console.error('Error executing webhook:', error);
    return {
      error: `An error occurred while executing the webhook: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for executing GitHub compatible webhooks on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeWebhook,
  definition: {
    type: 'function',
    function: {
      name: 'execute_github_compatible_webhook',
      description: 'Execute a GitHub compatible webhook on Discord.',
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
          payload: {
            type: 'object',
            description: 'The payload to send to the webhook.'
          },
          wait: {
            type: 'boolean',
            description: 'Whether to wait for the webhook to finish processing.'
          },
          thread_id: {
            type: 'string',
            description: 'The ID of the thread to send the message in.'
          }
        },
        required: ['webhook_id', 'webhook_token', 'payload']
      }
    }
  }
};

export { apiTool };