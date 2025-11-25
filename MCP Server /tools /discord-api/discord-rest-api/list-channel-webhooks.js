/**
 * Function to list webhooks for a specific channel in Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel for which to list webhooks.
 * @returns {Promise<Object>} - The result of the webhook listing.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/channels/${channel_id}/webhooks`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
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
    console.error('Error listing channel webhooks:', error);
    return {
      error: `An error occurred while listing channel webhooks: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing webhooks in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_channel_webhooks',
      description: 'List a channel\'s webhooks in Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel for which to list webhooks.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };