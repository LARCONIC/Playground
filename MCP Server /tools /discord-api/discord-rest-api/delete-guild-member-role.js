/**
 * Function to delete a role from a guild member in Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.guild_id - The ID of the guild (server).
 * @param {string} args.user_id - The ID of the user (member).
 * @param {string} args.role_id - The ID of the role to be removed.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ guild_id, user_id, role_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;

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

    // Return a success message for deletion
    return { message: 'Role deleted successfully', status: response.status };
  } catch (error) {
    console.error('Error deleting guild member role:', error);
    return {
      error: `An error occurred while deleting the role: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild member role in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_member_role',
      description: 'Delete a role from a guild member in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild (server).'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user (member).'
          },
          role_id: {
            type: 'string',
            description: 'The ID of the role to be removed.'
          }
        },
        required: ['guild_id', 'user_id', 'role_id']
      }
    }
  }
};

export { apiTool };