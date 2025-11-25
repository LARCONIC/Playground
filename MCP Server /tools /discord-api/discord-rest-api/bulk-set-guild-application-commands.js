/**
 * Function to bulk set guild application commands on Discord.
 *
 * @param {Object} args - Arguments for the command setup.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {Array<Object>} args.commands - An array of command objects to set.
 * @returns {Promise<Object>} - The result of the command setup.
 */
const executeFunction = async ({ application_id, guild_id, commands }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
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
    console.error('Error setting guild application commands:', error);
    return {
      error: `An error occurred while setting guild application commands: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for bulk setting guild application commands on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'bulk_set_guild_application_commands',
      description: 'Bulk set guild application commands on Discord.',
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
                      description: 'Constant value for the command type.'
                    }
                  },
                  required: ['title', 'description', 'const']
                },
                description: {
                  type: 'string',
                  description: 'Description of the command.'
                },
                options: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'integer',
                        description: 'Type of the option.'
                      },
                      name: {
                        type: 'string',
                        description: 'Name of the option.'
                      },
                      description: {
                        type: 'string',
                        description: 'Description of the option.'
                      },
                      required: {
                        type: 'boolean',
                        description: 'Whether the option is required.'
                      }
                    },
                    required: ['type', 'name', 'description']
                  }
                }
              },
              required: ['name', 'type', 'description']
            }
          }
        },
        required: ['application_id', 'guild_id', 'commands']
      }
    }
  }
};

export { apiTool };