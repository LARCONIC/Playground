/**
 * Function to add the current user to a Discord thread.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel where the thread is located.
 * @returns {Promise<Object>} - The response from the Discord API.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/channels/${channel_id}/thread-members/@me`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the response data
    return await response.json();
  } catch (error) {
    console.error('Error joining thread:', error);
    return {
      error: `An error occurred while joining the thread: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for joining a thread on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'join_thread',
      description: 'Add the current user to a Discord thread.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the thread is located.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };