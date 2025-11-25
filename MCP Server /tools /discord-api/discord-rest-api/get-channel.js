/**
 * Function to retrieve a channel from Discord.
 *
 * @param {Object} args - Arguments for the channel retrieval.
 * @param {string} args.channel_id - The ID of the channel to retrieve.
 * @returns {Promise<Object>} - The channel object or an error message.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with the channel ID
    const url = `${baseUrl}/channels/${channel_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
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
    console.error('Error retrieving channel:', error);
    return {
      error: `An error occurred while retrieving the channel: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a channel from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_channel',
      description: 'Retrieve a channel from Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to retrieve.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };