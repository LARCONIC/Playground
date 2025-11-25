/**
 * Function to retrieve details about the current OAuth2 authorization from Discord.
 *
 * @returns {Promise<Object>} - The details of the current authorization.
 */
const executeFunction = async () => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/oauth2/@me`;

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
    console.error('Error retrieving OAuth2 authorization:', error);
    return {
      error: `An error occurred while retrieving OAuth2 authorization: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving OAuth2 authorization details from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_my_oauth2_authorization',
      description: 'Retrieve details about the current OAuth2 authorization from Discord.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };