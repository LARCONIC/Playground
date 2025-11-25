/**
 * Function to update a webhook on Discord.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.webhook_id - The ID of the webhook to update.
 * @param {string} [args.name] - The new name for the webhook.
 * @param {string|null} [args.avatar] - The new avatar for the webhook (can be null).
 * @param {string|null} [args.channel_id] - The new channel ID for the webhook (can be null).
 * @returns {Promise<Object>} - The result of the webhook update.
 */
const executeFunction = async ({ webhook_id, name, avatar = null, channel_id = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the webhook update
    const url = `${baseUrl}/webhooks/${webhook_id}`;

    // Set up the request body
    const body = JSON.stringify({
      name,
      avatar,
      channel_id
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body
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
 * Tool configuration for updating a webhook on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_webhook',
      description: 'Update a webhook on Discord.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the webhook.'
          },
          avatar: {
            type: 'string',
            nullable: true,
            description: 'The new avatar for the webhook (can be null).'
          },
          channel_id: {
            type: 'string',
            nullable: true,
            description: 'The new channel ID for the webhook (can be null).'
          }
        },
        required: ['webhook_id']
      }
    }
  }
};

export { apiTool };