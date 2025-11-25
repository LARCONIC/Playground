/**
 * Function to delete a stage instance on Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.channel_id - The ID of the channel where the stage instance is located.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/stage-instances/${channel_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
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

    // Return a success message if the deletion was successful
    return { message: 'Stage instance deleted successfully.' };
  } catch (error) {
    console.error('Error deleting stage instance:', error);
    return {
      error: `An error occurred while deleting the stage instance: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a stage instance on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_stage_instance',
      description: 'Delete a stage instance on Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the stage instance is located.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };