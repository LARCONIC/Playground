/**
 * Function to delete a global command for a Discord application.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.command_id - The ID of the command to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ application_id, command_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/applications/${application_id}/commands/${command_id}`;

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

    // Return the response data
    return {
      status: response.status,
      message: 'Command deleted successfully.'
    };
  } catch (error) {
    console.error('Error deleting application command:', error);
    return {
      error: `An error occurred while deleting the command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a global command for a Discord application.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_application_command',
      description: 'Delete a global command for the app.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application.'
          },
          command_id: {
            type: 'string',
            description: 'The ID of the command to delete.'
          }
        },
        required: ['application_id', 'command_id']
      }
    }
  }
};

export { apiTool };