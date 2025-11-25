/**
 * Function to delete a channel in Discord.
 *
 * @param {Object} args - Arguments for the delete channel operation.
 * @param {string} args.channel_id - The ID of the channel to delete.
 * @returns {Promise<Object>} - The result of the delete channel operation.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the channel deletion
    const url = `${baseUrl}/channels/${channel_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return a success message or the response data
    return { message: 'Channel deleted successfully.' };
  } catch (error) {
    console.error('Error deleting channel:', error);
    return {
      error: `An error occurred while deleting the channel: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a channel in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_channel',
      description: 'Delete a channel in Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to delete.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };