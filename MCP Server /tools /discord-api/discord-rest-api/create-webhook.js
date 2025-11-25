/**
 * Function to create a webhook for a Discord channel.
 *
 * @param {Object} args - Arguments for creating the webhook.
 * @param {string} args.channel_id - The ID of the channel where the webhook will be created.
 * @param {string} args.name - The name of the webhook.
 * @param {string} [args.avatar=null] - The avatar of the webhook (optional).
 * @returns {Promise<Object>} - The result of the webhook creation.
 */
const executeFunction = async ({ channel_id, name, avatar = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for creating the webhook
    const url = `${baseUrl}/channels/${channel_id}/webhooks`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Prepare the body for the request
    const body = JSON.stringify({ name, avatar });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error creating webhook:', error);
    return {
      error: `An error occurred while creating the webhook: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a webhook on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_webhook',
      description: 'Create a new webhook for a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the webhook will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the webhook.'
          },
          avatar: {
            type: 'string',
            description: 'The avatar of the webhook (optional).'
          }
        },
        required: ['channel_id', 'name']
      }
    }
  }
};

export { apiTool };