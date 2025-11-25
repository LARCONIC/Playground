/**
 * Function to retrieve a webhook from Discord.
 *
 * @param {Object} args - Arguments for the webhook retrieval.
 * @param {string} args.webhook_id - The ID of the webhook to retrieve.
 * @returns {Promise<Object>} - The result of the webhook retrieval.
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
      name: 'get_webhook',
      description: 'Retrieve a webhook from Discord.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook to retrieve.'
          }
        },
        required: ['webhook_id']
      }
    }
  }
};

export { apiTool };