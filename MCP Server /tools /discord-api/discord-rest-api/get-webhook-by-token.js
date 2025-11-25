/**
 * Function to retrieve a webhook using its ID and token.
 *
 * @param {Object} args - Arguments for the webhook retrieval.
 * @param {string} args.webhook_id - The ID of the webhook to retrieve.
 * @param {string} args.webhook_token - The token associated with the webhook.
 * @returns {Promise<Object>} - The result of the webhook retrieval.
 */
const executeFunction = async ({ webhook_id, webhook_token }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/webhooks/${webhook_id}/${webhook_token}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
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
    console.error('Error retrieving webhook:', error);
    return {
      error: `An error occurred while retrieving the webhook: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a webhook from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_webhook_by_token',
      description: 'Retrieve a webhook using its ID and token.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook to retrieve.'
          },
          webhook_token: {
            type: 'string',
            description: 'The token associated with the webhook.'
          }
        },
        required: ['webhook_id', 'webhook_token']
      }
    }
  }
};

export { apiTool };