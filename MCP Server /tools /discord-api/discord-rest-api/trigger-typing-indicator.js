/**
 * Function to trigger a typing indicator in a Discord channel.
 *
 * @param {Object} args - Arguments for the typing indicator.
 * @param {string} args.channel_id - The ID of the channel where the typing indicator will be triggered.
 * @returns {Promise<Object>} - The response from the Discord API after triggering the typing indicator.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  
  try {
    // Construct the URL with the channel ID
    const url = `${baseUrl}/channels/${channel_id}/typing`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    return {
      status: response.status,
      message: 'Typing indicator triggered successfully.'
    };
  } catch (error) {
    console.error('Error triggering typing indicator:', error);
    return {
      error: `An error occurred while triggering the typing indicator: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for triggering a typing indicator in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'trigger_typing_indicator',
      description: 'Trigger a typing indicator in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the typing indicator will be triggered.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };