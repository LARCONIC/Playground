/**
 * Function to list all global application commands for a Discord app.
 *
 * @param {Object} args - Arguments for the command listing.
 * @param {string} args.application_id - The ID of the application whose commands are to be listed.
 * @param {boolean|null} [args.with_localizations=null] - Whether to include localizations in the response.
 * @returns {Promise<Object>} - The result of the command listing.
 */
const executeFunction = async ({ application_id, with_localizations = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with the application ID and query parameters
    const url = new URL(`${baseUrl}/applications/${application_id}/commands`);
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
    console.error('Error listing application commands:', error);
    return {
      error: `An error occurred while listing application commands: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing application commands on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_application_commands',
      description: 'List all global application commands for a Discord app.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application whose commands are to be listed.'
          },
          with_localizations: {
            type: 'boolean',
            description: 'Whether to include localizations in the response.'
          }
        },
        required: ['application_id']
      }
    }
  }
};

export { apiTool };