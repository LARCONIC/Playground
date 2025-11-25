/**
 * Function to delete a guild integration from Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.guild_id - The ID of the guild from which to delete the integration.
 * @param {string} args.integration_id - The ID of the integration to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ guild_id, integration_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/integrations/${integration_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
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

    // Return a success message or empty response
    return { message: 'Integration deleted successfully.' };
  } catch (error) {
    console.error('Error deleting guild integration:', error);
    return {
      error: `An error occurred while deleting the guild integration: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild integration on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_integration',
      description: 'Delete a guild integration from Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild from which to delete the integration.'
          },
          integration_id: {
            type: 'string',
            description: 'The ID of the integration to delete.'
          }
        },
        required: ['guild_id', 'integration_id']
      }
    }
  }
};

export { apiTool };