/**
 * Function to delete a webhook from Discord.
 *
 * @param {Object} args - Arguments for the delete webhook function.
 * @param {string} args.webhook_id - The ID of the webhook to delete.
 * @returns {Promise<Object>} - The result of the delete webhook operation.
 */
const executeFunction = async ({ webhook_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the webhook
    const url = `${baseUrl}/webhooks/${webhook_id}`;

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

    // Return success message for deletion
    return { message: 'Webhook deleted successfully.' };
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
      name: 'delete_webhook',
      description: 'Delete a webhook from Discord.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook to delete.'
          }
        },
        required: ['webhook_id']
      }
    }
  }
};

export { apiTool };