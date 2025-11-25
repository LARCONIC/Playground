/**
 * Function to retrieve a guild application command from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.command_id - The ID of the command.
 * @returns {Promise<Object>} - The result of the command retrieval.
 */
const executeFunction = async ({ application_id, guild_id, command_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
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
    console.error('Error retrieving guild application command:', error);
    return {
      error: `An error occurred while retrieving the command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a guild application command from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_application_command',
      description: 'Retrieve a guild application command for the app.',
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
          }
        },
        required: ['application_id', 'guild_id', 'command_id']
      }
    }
  }
};

export { apiTool };