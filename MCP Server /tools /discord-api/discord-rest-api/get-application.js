/**
 * Function to retrieve details about a Discord application.
 *
 * @param {Object} args - Arguments for the application retrieval.
 * @param {string} args.application_id - The ID of the application to retrieve.
 * @returns {Promise<Object>} - The details of the application.
 */
const executeFunction = async ({ application_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the application details
    const url = `${baseUrl}/applications/${application_id}`;

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
    console.error('Error retrieving application details:', error);
    return {
      error: `An error occurred while retrieving application details: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving application details from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_application',
      description: 'Retrieve details about a Discord application.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application to retrieve.'
          }
        },
        required: ['application_id']
      }
    }
  }
};

export { apiTool };