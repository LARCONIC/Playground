/**
 * Function to delete a guild application command on Discord.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.command_id - The ID of the command to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ application_id, guild_id, command_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
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

    // Return the response data (204 No Content means no data to return)
    return { status: 'Command deleted successfully' };
  } catch (error) {
    console.error('Error deleting guild application command:', error);
    return {
      error: `An error occurred while deleting the command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a guild application command on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_application_command',
      description: 'Delete a guild application command on Discord.',
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
            description: 'The ID of the command to delete.'
          }
        },
        required: ['application_id', 'guild_id', 'command_id']
      }
    }
  }
};

export { apiTool };