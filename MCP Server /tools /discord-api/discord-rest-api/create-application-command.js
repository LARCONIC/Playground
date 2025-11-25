/**
 * Function to create an application command for a Discord bot.
 *
 * @param {Object} args - Arguments for creating the command.
 * @param {string} args.application_id - The ID of the application for which to create the command.
 * @param {string} args.name - The name of the command.
 * @param {string} args.description - The description of the command.
 * @param {Array<Object>} args.options - The options for the command.
 * @returns {Promise<Object>} - The result of the command creation.
 */
const executeFunction = async ({ application_id, name, description, options }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const commandData = {
    name,
    type: {
      title: "CHAT",
      description: "Slash commands; a text-based command that shows up when a user types /",
      const: 1
    },
    description,
    options
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/applications/${application_id}/commands`, {
      method: 'POST',
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
    console.error('Error creating application command:', error);
    return {
      error: `An error occurred while creating the application command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an application command for a Discord bot.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_application_command',
      description: 'Create a global command for the Discord application.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application for which to create the command.'
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
              },
              required: ['type', 'name', 'description']
            },
            description: 'The options for the command.'
          }
        },
        required: ['application_id', 'name', 'description']
      }
    }
  }
};

export { apiTool };