/**
 * Function to create a guild application command on Discord.
 *
 * @param {Object} args - Arguments for creating the command.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.name - The name of the command.
 * @param {string} args.description - The description of the command.
 * @param {Array} args.options - The options for the command.
 * @returns {Promise<Object>} - The result of the command creation.
 */
const executeFunction = async ({ application_id, guild_id, name, description, options }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  const commandData = {
    name,
    description,
    options,
    type: {
      title: "CHAT",
      description: "Slash commands; a text-based command that shows up when a user types /",
      const: 1
    }
  };

  try {
    const url = `${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(commandData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating guild application command:', error);
    return {
      error: `An error occurred while creating the command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild application command on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_application_command',
      description: 'Create a new guild command for the app.',
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
          }
        },
        required: ['application_id', 'guild_id', 'name', 'description']
      }
    }
  }
};

export { apiTool };