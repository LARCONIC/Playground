/**
 * Function to update an application command in Discord.
 *
 * @param {Object} args - Arguments for updating the command.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.command_id - The ID of the command to update.
 * @param {string} args.name - The name of the command.
 * @param {string} args.description - The description of the command.
 * @param {Array} args.options - The options for the command.
 * @param {string} [args.default_member_permissions] - The default member permissions for the command.
 * @param {boolean} [args.dm_permission] - Whether the command can be used in DMs.
 * @returns {Promise<Object>} - The result of the command update.
 */
const executeFunction = async ({ application_id, command_id, name, description, options, default_member_permissions = null, dm_permission = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/applications/${application_id}/commands/${command_id}`;
  
  const body = {
    name,
    description,
    options,
    default_member_permissions,
    dm_permission
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bot ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating application command:', error);
    return {
      error: `An error occurred while updating the application command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating an application command in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_application_command',
      description: 'Update a global command for the app.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application.'
          },
          command_id: {
            type: 'string',
            description: 'The ID of the command to update.'
          },
          name: {
            type: 'string',
            description: 'The name of the command.'
          },
          description: {
            type: 'string',
            description: 'The description of the command.'
          },
          options: {
            type: 'array',
            description: 'The options for the command.'
          },
          default_member_permissions: {
            type: 'string',
            description: 'The default member permissions for the command.'
          },
          dm_permission: {
            type: 'boolean',
            description: 'Whether the command can be used in DMs.'
          }
        },
        required: ['application_id', 'command_id', 'name', 'description', 'options']
      }
    }
  }
};

export { apiTool };