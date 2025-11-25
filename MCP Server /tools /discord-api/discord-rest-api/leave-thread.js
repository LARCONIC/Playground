/**
 * Function to remove the current user from a Discord thread.
 *
 * @param {Object} args - Arguments for the leave thread operation.
 * @param {string} args.channel_id - The ID of the channel from which to leave the thread.
 * @returns {Promise<Object>} - The result of the leave thread operation.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/channels/${channel_id}/thread-members/@me`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
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
    return { message: 'Successfully left the thread.' };
  } catch (error) {
    console.error('Error leaving the thread:', error);
    return {
      error: `An error occurred while leaving the thread: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for leaving a thread on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'leave_thread',
      description: 'Remove the current user from the thread.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel from which to leave the thread.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };