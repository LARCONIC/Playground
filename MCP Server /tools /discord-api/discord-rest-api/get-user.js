/**
 * Function to retrieve a user from Discord by user ID.
 *
 * @param {Object} args - Arguments for the user retrieval.
 * @param {string} args.user_id - The ID of the user to retrieve.
 * @returns {Promise<Object>} - The user object retrieved from Discord.
 */
const executeFunction = async ({ user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with the user ID
    const url = `${baseUrl}/users/${user_id}`;

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
    console.error('Error retrieving user:', error);
    return {
      error: `An error occurred while retrieving the user: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a user from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_user',
      description: 'Retrieve a user from Discord by user ID.',
      parameters: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            description: 'The ID of the user to retrieve.'
          }
        },
        required: ['user_id']
      }
    }
  }
};

export { apiTool };