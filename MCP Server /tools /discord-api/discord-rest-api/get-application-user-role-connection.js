/**
 * Function to retrieve an application's role connection metadata for the user.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.application_id - The ID of the application to retrieve role connection metadata for.
 * @returns {Promise<Object>} - The role connection metadata for the specified application.
 */
const executeFunction = async ({ application_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the application ID
    const url = `${baseUrl}/users/@me/applications/${application_id}/role-connection`;

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
    console.error('Error retrieving application user role connection:', error);
    return {
      error: `An error occurred while retrieving the application user role connection: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving application user role connection metadata on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_application_user_role_connection',
      description: 'Retrieve an app\'s role connection metadata for the user.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application to retrieve role connection metadata for.'
          }
        },
        required: ['application_id']
      }
    }
  }
};

export { apiTool };