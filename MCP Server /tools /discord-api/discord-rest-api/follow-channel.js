/**
 * Function to follow an announcement channel in Discord.
 *
 * @param {Object} args - Arguments for the follow channel request.
 * @param {string} args.channel_id - The ID of the channel to follow.
 * @param {string} args.webhook_channel_id - The ID of the webhook channel to send messages to.
 * @returns {Promise<Object>} - The result of the follow channel request.
 */
const executeFunction = async ({ channel_id, webhook_channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the follow channel endpoint
    const url = `${baseUrl}/channels/${channel_id}/followers`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Create the request body
    const body = JSON.stringify({ webhook_channel_id });

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
    console.error('Error following channel:', error);
    return {
      error: `An error occurred while following the channel: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for following a channel in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'follow_channel',
      description: 'Follow an announcement channel in Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to follow.'
          },
          webhook_channel_id: {
            type: 'string',
            description: 'The ID of the webhook channel to send messages to.'
          }
        },
        required: ['channel_id', 'webhook_channel_id']
      }
    }
  }
};

export { apiTool };