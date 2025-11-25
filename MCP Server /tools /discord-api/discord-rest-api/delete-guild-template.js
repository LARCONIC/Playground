/**
 * Function to delete a guild template from Discord.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.guild_id - The ID of the guild from which the template will be deleted.
 * @param {string} args.code - The code of the template to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ guild_id, code }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/templates/${code}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting guild template:', error);
    return {
      error: `An error occurred while deleting the guild template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild template on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_template',
      description: 'Delete a guild template from Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild from which the template will be deleted.'
          },
          code: {
            type: 'string',
            description: 'The code of the template to be deleted.'
          }
        },
        required: ['guild_id', 'code']
      }
    }
  }
};

export { apiTool };