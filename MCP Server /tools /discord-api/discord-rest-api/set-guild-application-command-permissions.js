/**
 * Function to set guild application command permissions in Discord.
 *
 * @param {Object} args - Arguments for setting command permissions.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.command_id - The ID of the command.
 * @param {Array<Object>} args.permissions - An array of permission objects.
 * @returns {Promise<Object>} - The result of the command permissions update.
 */
const executeFunction = async ({ application_id, guild_id, command_id, permissions }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands/${command_id}/permissions`;
  
  const body = JSON.stringify({ permissions });

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bot ${token}`
      },
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error setting guild application command permissions:', error);
    return {
      error: `An error occurred while setting command permissions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting guild application command permissions in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_guild_application_command_permissions',
      description: 'Set permissions for a command in a guild.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application.'
          },
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          command_id: {
            type: 'string',
            description: 'The ID of the command.'
          },
          permissions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'The ID of the role or user.'
                },
                type: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      description: 'The type of permission.'
                    },
                    const: {
                      type: 'integer',
                      description: 'The constant value for the type.'
                    }
                  }
                },
                permission: {
                  type: 'boolean',
                  description: 'Whether the permission is granted or not.'
                }
              },
              required: ['id', 'type', 'permission']
            },
            description: 'An array of permission objects.'
          }
        },
        required: ['application_id', 'guild_id', 'command_id', 'permissions']
      }
    }
  }
};

export { apiTool };