/**
 * Function to delete a webhook using its ID and token.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.webhook_id - The ID of the webhook to delete.
 * @param {string} args.webhook_token - The token of the webhook to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ webhook_id, webhook_token }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the webhook ID and token
    const url = `${baseUrl}/webhooks/${webhook_id}/${webhook_token}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
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

    // Return the response data
    return {
      status: response.status,
      message: 'Webhook deleted successfully.'
    };
  } catch (error) {
    console.error('Error deleting webhook:', error);
    return {
      error: `An error occurred while deleting the webhook: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a webhook on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_webhook_by_token',
      description: 'Delete a webhook using its ID and token.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook to delete.'
          },
          webhook_token: {
            type: 'string',
            description: 'The token of the webhook to delete.'
          }
        },
        required: ['webhook_id', 'webhook_token']
      }
    }
  }
};

export { apiTool };