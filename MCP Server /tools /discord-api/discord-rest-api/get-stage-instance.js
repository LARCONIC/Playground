/**
 * Function to get the stage instance associated with a stage channel on Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel for which to get the stage instance.
 * @returns {Promise<Object>} - The response containing the stage instance data or an error message.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with the channel ID
    const url = `${baseUrl}/stage-instances/${channel_id}`;

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
    console.error('Error getting stage instance:', error);
    return {
      error: `An error occurred while getting the stage instance: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the stage instance on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_stage_instance',
      description: 'Get the instance associated with a stage channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel for which to get the stage instance.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };