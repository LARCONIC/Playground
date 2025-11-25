/**
 * Function to delete the original webhook message in Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} [args.thread_id] - The ID of the thread (optional).
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ webhook_id, webhook_token, thread_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = new URL(`${baseUrl}/webhooks/${webhook_id}/${webhook_token}/messages/@original`);
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

    // Return the response status
    return {
      status: response.status,
      message: 'Message deleted successfully.'
    };
  } catch (error) {
    console.error('Error deleting original webhook message:', error);
    return {
      error: `An error occurred while deleting the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting the original webhook message in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_original_webhook_message',
      description: 'Delete the original interaction response of a webhook message.',
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