/**
 * Function to add a role to a guild member in Discord.
 *
 * @param {Object} args - Arguments for adding a role to a guild member.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.user_id - The ID of the user to whom the role will be added.
 * @param {string} args.role_id - The ID of the role to be added.
 * @returns {Promise<Object>} - The result of the role addition.
 */
const executeFunction = async ({ guild_id, user_id, role_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
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
    return { status: response.status, message: 'Role added successfully.' };
  } catch (error) {
    console.error('Error adding role to guild member:', error);
    return {
      error: `An error occurred while adding the role: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for adding a role to a guild member in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_guild_member_role',
      description: 'Add a role to a guild member in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to whom the role will be added.'
          },
          role_id: {
            type: 'string',
            description: 'The ID of the role to be added.'
          }
        },
        required: ['guild_id', 'user_id', 'role_id']
      }
    }
  }
};

export { apiTool };