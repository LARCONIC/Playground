/**
 * Function to list guild application commands for a Discord application.
 *
 * @param {Object} args - Arguments for the command listing.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {boolean} [args.with_localizations=null] - Whether to include localizations.
 * @returns {Promise<Object>} - The list of guild application commands.
 */
const executeFunction = async ({ application_id, guild_id, with_localizations = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path variables and query parameters
    const url = new URL(`${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands`);
    if (with_localizations !== null) {
      url.searchParams.append('with_localizations', with_localizations);
    }

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error listing guild application commands:', error);
    return {
      error: `An error occurred while listing guild application commands: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing guild application commands on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_application_commands',
      description: 'Retrieve a list of all guild commands for the app.',
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
          with_localizations: {
            type: 'boolean',
            description: 'Whether to include localizations.'
          }
        },
        required: ['application_id', 'guild_id']
      }
    }
  }
};

export { apiTool };