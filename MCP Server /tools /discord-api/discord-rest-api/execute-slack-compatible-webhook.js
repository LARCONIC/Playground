/**
 * Function to execute a Slack-compatible webhook on Discord.
 *
 * @param {Object} args - Arguments for the webhook execution.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} args.text - The text to send in the webhook.
 * @param {string} args.username - The username to display in the webhook.
 * @param {string} [args.icon_url] - The URL of the icon to display in the webhook.
 * @param {Array} [args.attachments] - Any attachments to include in the webhook.
 * @param {boolean} [args.wait] - Whether to wait for the message to be sent.
 * @param {string} [args.thread_id] - The ID of the thread to send the message in.
 * @returns {Promise<Object>} - The result of the webhook execution.
 */
const executeWebhook = async ({ webhook_id, webhook_token, text, username, icon_url, attachments = [], wait = null, thread_id = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user

  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/webhooks/${webhook_id}/${webhook_token}/slack`);
    if (wait !== null) url.searchParams.append('wait', wait);
    if (thread_id) url.searchParams.append('thread_id', thread_id);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Prepare the body data
    const bodyData = new URLSearchParams();
    bodyData.append('text', text);
    bodyData.append('username', username);
    if (icon_url) bodyData.append('icon_url', icon_url);
    if (attachments.length > 0) bodyData.append('attachments', JSON.stringify(attachments));

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: bodyData
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
 * Tool configuration for executing a Slack-compatible webhook on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeWebhook,
  definition: {
    type: 'function',
    function: {
      name: 'execute_slack_compatible_webhook',
      description: 'Execute a Slack-compatible webhook on Discord.',
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
          text: {
            type: 'string',
            description: 'The text to send in the webhook.'
          },
          username: {
            type: 'string',
            description: 'The username to display in the webhook.'
          },
          icon_url: {
            type: 'string',
            description: 'The URL of the icon to display in the webhook.'
          },
          attachments: {
            type: 'array',
            description: 'Any attachments to include in the webhook.'
          },
          wait: {
            type: 'boolean',
            description: 'Whether to wait for the message to be sent.'
          },
          thread_id: {
            type: 'string',
            description: 'The ID of the thread to send the message in.'
          }
        },
        required: ['webhook_id', 'webhook_token', 'text', 'username']
      }
    }
  }
};

export { apiTool };