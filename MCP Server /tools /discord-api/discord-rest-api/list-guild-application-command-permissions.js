/**
 * Function to list guild application command permissions for a Discord bot.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @returns {Promise<Object>} - The result of the command permissions listing.
 */
const executeFunction = async ({ application_id, guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands/permissions`;

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
    console.error('Error listing guild application command permissions:', error);
    return {
      error: `An error occurred while listing command permissions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing guild application command permissions on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_application_command_permissions',
      description: 'List the command permission objects for all of the app\'s commands in the guild.',
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
          }
        },
        required: ['application_id', 'guild_id']
      }
    }
  }
};

export { apiTool };