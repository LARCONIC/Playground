/**
 * Function to update a role in a Discord guild.
 *
 * @param {Object} args - Arguments for the role update.
 * @param {string} args.guild_id - The ID of the guild where the role exists.
 * @param {string} args.role_id - The ID of the role to update.
 * @param {Object} args.roleData - The data to update the role with.
 * @param {string} [args.roleData.name] - The name of the role.
 * @param {number} [args.roleData.permissions] - The permissions for the role.
 * @param {number} [args.roleData.color] - The color of the role.
 * @param {boolean} [args.roleData.hoist] - Whether the role should be displayed separately in the sidebar.
 * @param {boolean} [args.roleData.mentionable] - Whether the role should be mentionable.
 * @param {string} [args.roleData.icon] - The icon of the role.
 * @param {string} [args.roleData.unicode_emoji] - The Unicode emoji of the role.
 * @returns {Promise<Object>} - The result of the role update.
 */
const executeFunction = async ({ guild_id, role_id, roleData }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the role update
    const url = `${baseUrl}/guilds/${guild_id}/roles/${role_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(roleData)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating guild role:', error);
    return {
      error: `An error occurred while updating the guild role: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a guild role in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_role',
      description: 'Update a role in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the role exists.'
          },
          role_id: {
            type: 'string',
            description: 'The ID of the role to update.'
          },
          roleData: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The name of the role.'
              },
              permissions: {
                type: 'integer',
                description: 'The permissions for the role.'
              },
              color: {
                type: 'integer',
                description: 'The color of the role.'
              },
              hoist: {
                type: 'boolean',
                description: 'Whether the role should be displayed separately in the sidebar.'
              },
              mentionable: {
                type: 'boolean',
                description: 'Whether the role should be mentionable.'
              },
              icon: {
                type: 'string',
                description: 'The icon of the role.'
              },
              unicode_emoji: {
                type: 'string',
                description: 'The Unicode emoji of the role.'
              }
            }
          }
        },
        required: ['guild_id', 'role_id', 'roleData']
      }
    }
  }
};

export { apiTool };