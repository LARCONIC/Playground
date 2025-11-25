/**
 * Function to delete a message created by a webhook on Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} args.message_id - The ID of the message to delete.
 * @param {string} [args.thread_id] - The ID of the thread the message is in (optional).
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ webhook_id, webhook_token, message_id, thread_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = new URL(`${baseUrl}/webhooks/${webhook_id}/${webhook_token}/messages/${message_id}`);
    if (thread_id) {
      url.searchParams.append('thread_id', thread_id);
    }

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return a success message
    return { message: 'Message deleted successfully', status: response.status };
  } catch (error) {
    console.error('Error deleting webhook message:', error);
    return {
      error: `An error occurred while deleting the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a webhook message on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_webhook_message',
      description: 'Delete a message created by a webhook on Discord.',
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
            description: 'The ID of the message to delete.'
          },
          thread_id: {
            type: 'string',
            description: 'The ID of the thread the message is in (optional).'
          }
        },
        required: ['webhook_id', 'webhook_token', 'message_id']
      }
    }
  }
};

export { apiTool };