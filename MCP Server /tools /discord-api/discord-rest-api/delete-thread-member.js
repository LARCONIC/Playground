/**
 * Function to delete a member from a Discord thread.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.channel_id - The ID of the channel.
 * @param {string} args.user_id - The ID of the user to remove from the thread.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ channel_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/channels/${channel_id}/thread-members/${user_id}`;

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

    // Return a success message for 204 No Content
    return { message: 'Member successfully removed from the thread.' };
  } catch (error) {
    console.error('Error deleting thread member:', error);
    return {
      error: `An error occurred while deleting the thread member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a member from a Discord thread.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_thread_member',
      description: 'Remove a member from a thread in Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to remove from the thread.'
          }
        },
        required: ['channel_id', 'user_id']
      }
    }
  }
};

export { apiTool };