/**
 * Function to remove a user from a group DM on Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.channel_id - The ID of the channel (group DM).
 * @param {string} args.user_id - The ID of the user to remove.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ channel_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/channels/${channel_id}/recipients/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
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

    // Return success response
    return { status: 'No Content', code: 204 };
  } catch (error) {
    console.error('Error deleting user from group DM:', error);
    return {
      error: `An error occurred while deleting the user from the group DM: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a user from a group DM on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_group_dm_user',
      description: 'Remove a user from a group DM on Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel (group DM).'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to remove.'
          }
        },
        required: ['channel_id', 'user_id']
      }
    }
  }
};

export { apiTool };