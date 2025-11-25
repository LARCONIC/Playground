/**
 * Function to permanently delete a guild on Discord.
 *
 * @param {Object} args - Arguments for the delete guild operation.
 * @param {string} args.guild_id - The ID of the guild to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/guilds/${guild_id}`;

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

    // Return success response
    return { message: 'Guild deleted successfully.' };
  } catch (error) {
    console.error('Error deleting guild:', error);
    return {
      error: `An error occurred while deleting the guild: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild',
      description: 'Permanently delete a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to delete.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };