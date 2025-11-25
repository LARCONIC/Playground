/**
 * Function to delete a role in a guild on Discord.
 *
 * @param {Object} args - Arguments for the delete role operation.
 * @param {string} args.guild_id - The ID of the guild (server) where the role exists.
 * @param {string} args.role_id - The ID of the role to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ guild_id, role_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the delete request
    const url = `${baseUrl}/guilds/${guild_id}/roles/${role_id}`;

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

    // Return a success message or response
    return { status: 'No Content', message: 'Role deleted successfully.' };
  } catch (error) {
    console.error('Error deleting guild role:', error);
    return {
      error: `An error occurred while deleting the guild role: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild role on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_role',
      description: 'Delete a role in a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild (server) where the role exists.'
          },
          role_id: {
            type: 'string',
            description: 'The ID of the role to be deleted.'
          }
        },
        required: ['guild_id', 'role_id']
      }
    }
  }
};

export { apiTool };