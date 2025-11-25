/**
 * Function to get application role connections metadata from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.application_id - The ID of the application to retrieve role connections metadata for.
 * @returns {Promise<Object>} - The metadata for the application role connections.
 */
const executeFunction = async ({ application_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the application ID
    const url = `${baseUrl}/applications/${application_id}/role-connections/metadata`;

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
    console.error('Error getting application role connections metadata:', error);
    return {
      error: `An error occurred while getting application role connections metadata: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting application role connections metadata from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_application_role_connections_metadata',
      description: 'Get application role connections metadata from Discord.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application to retrieve role connections metadata for.'
          }
        },
        required: ['application_id']
      }
    }
  }
};

export { apiTool };