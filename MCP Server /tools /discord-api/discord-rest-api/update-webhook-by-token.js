/**
 * Function to update a webhook using its token.
 *
 * @param {Object} args - Arguments for the webhook update.
 * @param {string} args.webhook_id - The ID of the webhook to update.
 * @param {string} args.webhook_token - The token of the webhook to update.
 * @param {string} [args.name] - The new name for the webhook.
 * @param {string|null} [args.avatar] - The new avatar for the webhook (can be null).
 * @returns {Promise<Object>} - The result of the webhook update.
 */
const executeFunction = async ({ webhook_id, webhook_token, name, avatar }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/webhooks/${webhook_id}/${webhook_token}`;

  // Prepare the payload for the request
  const payload = JSON.stringify({
    name,
    avatar
  });

  // Set up headers for the request
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bot ${token}`
  };

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: payload
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
    console.error('Error updating webhook:', error);
    return {
      error: `An error occurred while updating the webhook: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a webhook by token on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_webhook_by_token',
      description: 'Update a webhook using its token.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook to update.'
          },
          webhook_token: {
            type: 'string',
            description: 'The token of the webhook to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the webhook.'
          },
          avatar: {
            type: 'string',
            description: 'The new avatar for the webhook (can be null).'
          }
        },
        required: ['webhook_id', 'webhook_token']
      }
    }
  }
};

export { apiTool };