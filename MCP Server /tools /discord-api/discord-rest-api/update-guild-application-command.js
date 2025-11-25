/**
 * Function to update a guild application command in Discord.
 *
 * @param {Object} args - Arguments for the command update.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.command_id - The ID of the command to update.
 * @param {Object} args.commandData - The data for the command update.
 * @param {string} args.commandData.name - The name of the command.
 * @param {string} args.commandData.description - The description of the command.
 * @param {Object} [args.commandData.options] - The options for the command.
 * @returns {Promise<Object>} - The result of the command update.
 */
const executeFunction = async ({ application_id, guild_id, command_id, commandData }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(commandData)
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
    console.error('Error updating guild application command:', error);
    return {
      error: `An error occurred while updating the command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a guild application command in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_application_command',
      description: 'Update a guild application command in Discord.',
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
            description: 'The ID of the command to update.'
          },
          commandData: {
            type: 'object',
            properties: {
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
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'integer',
                      description: 'The type of the option.'
                    },
                    name: {
                      type: 'string',
                      description: 'The name of the option.'
                    },
                    description: {
                      type: 'string',
                      description: 'The description of the option.'
                    },
                    required: {
                      type: 'boolean',
                      description: 'Whether the option is required.'
                    }
                  }
                },
                description: 'The options for the command.'
              }
            },
            required: ['name', 'description']
          }
        },
        required: ['application_id', 'guild_id', 'command_id', 'commandData']
      }
    }
  }
};

export { apiTool };