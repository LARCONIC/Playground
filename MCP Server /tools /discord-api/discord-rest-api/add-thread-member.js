/**
 * Function to add a member to a Discord thread.
 *
 * @param {Object} args - Arguments for adding a thread member.
 * @param {string} args.channel_id - The ID of the channel where the thread is located.
 * @param {string} args.user_id - The ID of the user to add to the thread.
 * @returns {Promise<Object>} - The result of the add thread member operation.
 */
const executeFunction = async ({ channel_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/channels/${channel_id}/thread-members/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
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
    return {
      status: response.status,
      message: 'Member added to thread successfully.'
    };
  } catch (error) {
    console.error('Error adding thread member:', error);
    return {
      error: `An error occurred while adding the thread member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for adding a member to a Discord thread.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_thread_member',
      description: 'Add a member to a Discord thread.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the thread is located.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to add to the thread.'
          }
        },
        required: ['channel_id', 'user_id']
      }
    }
  }
};

export { apiTool };