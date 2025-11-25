/**
 * Function to bulk set application commands for a Discord application.
 *
 * @param {Object} args - Arguments for the command setup.
 * @param {string} args.application_id - The ID of the application for which commands are being set.
 * @param {Array<Object>} args.commands - An array of command objects to be set.
 * @returns {Promise<Object>} - The result of the bulk set application commands operation.
 */
const executeFunction = async ({ application_id, commands }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  const url = `${baseUrl}/applications/${application_id}/commands`;

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(commands)
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
    console.error('Error bulk setting application commands:', error);
    return {
      error: `An error occurred while bulk setting application commands: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for bulk setting application commands on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'bulk_set_application_commands',
      description: 'Bulk set application commands for a Discord application.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application for which commands are being set.'
          },
          commands: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'The name of the command.'
                },
                type: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      description: 'The title of the command type.'
                    },
                    description: {
                      type: 'string',
                      description: 'Description of the command type.'
                    },
                    const: {
                      type: 'integer',
                      description: 'Constant value representing the command type.'
                    }
                  }
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
                  }
                }
              },
              required: ['name', 'type', 'description']
            }
          }
        },
        required: ['application_id', 'commands']
      }
    }
  }
};

export { apiTool };