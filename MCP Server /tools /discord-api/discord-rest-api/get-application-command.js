/**
 * Function to retrieve a global command for a Discord application.
 *
 * @param {Object} args - Arguments for the command retrieval.
 * @param {string} args.application_id - The ID of the application.
 * @param {string} args.command_id - The ID of the command to retrieve.
 * @returns {Promise<Object>} - The result of the command retrieval.
 */
const executeFunction = async ({ application_id, command_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/applications/${application_id}/commands/${command_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
      'Accept': 'application/json'
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
    console.error('Error retrieving application command:', error);
    return {
      error: `An error occurred while retrieving the application command: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a global command for a Discord application.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_application_command',
      description: 'Retrieve a global command for the app.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application.'
          },
          command_id: {
            type: 'string',
            description: 'The ID of the command to retrieve.'
          }
        },
        required: ['application_id', 'command_id']
      }
    }
  }
};

export { apiTool };