/**
 * Function to sync a guild template with the current state of the guild.
 *
 * @param {Object} args - Arguments for syncing the guild template.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.code - The template code.
 * @returns {Promise<Object>} - The result of the sync operation.
 */
const executeFunction = async ({ guild_id, code }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user

  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/templates/${code}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error syncing guild template:', error);
    return {
      error: `An error occurred while syncing the guild template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for syncing a guild template on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'sync_guild_template',
      description: 'Sync a template to the guild\'s current state.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          code: {
            type: 'string',
            description: 'The template code.'
          }
        },
        required: ['guild_id', 'code']
      }
    }
  }
};

export { apiTool };