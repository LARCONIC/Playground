/**
 * Function to retrieve a guild template from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.code - The code of the guild template to retrieve.
 * @returns {Promise<Object>} - The result of the guild template retrieval.
 */
const executeFunction = async ({ code }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with the template code
    const url = `${baseUrl}/guilds/templates/${code}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
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
    console.error('Error retrieving guild template:', error);
    return {
      error: `An error occurred while retrieving the guild template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a guild template from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_template',
      description: 'Retrieve a guild template from Discord.',
      parameters: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'The code of the guild template to retrieve.'
          }
        },
        required: ['code']
      }
    }
  }
};

export { apiTool };