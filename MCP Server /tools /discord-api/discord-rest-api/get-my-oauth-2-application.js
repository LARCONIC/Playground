/**
 * Function to retrieve the OAuth2 application associated with the requesting bot user.
 *
 * @returns {Promise<Object>} - The application details of the bot user.
 */
const executeFunction = async () => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/oauth2/applications/@me`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
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
    console.error('Error retrieving OAuth2 application:', error);
    return {
      error: `An error occurred while retrieving the OAuth2 application: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving the OAuth2 application associated with the bot user.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_my_oauth2_application',
      description: 'Retrieve the OAuth2 application associated with the requesting bot user.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };