/**
 * Function to delete a permission overwrite for a user or role in a Discord channel.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.channel_id - The ID of the channel from which to delete the permission overwrite.
 * @param {string} args.overwrite_id - The ID of the permission overwrite to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ channel_id, overwrite_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/permissions/${overwrite_id}`;

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

    // Return success response
    return { status: 'success', message: 'Permission overwrite deleted successfully.' };
  } catch (error) {
    console.error('Error deleting permission overwrite:', error);
    return {
      error: `An error occurred while deleting the permission overwrite: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a channel permission overwrite on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_channel_permission_overwrite',
      description: 'Delete a permission overwrite for a user or role in a channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel from which to delete the permission overwrite.'
          },
          overwrite_id: {
            type: 'string',
            description: 'The ID of the permission overwrite to delete.'
          }
        },
        required: ['channel_id', 'overwrite_id']
      }
    }
  }
};

export { apiTool };