/**
 * Function to get the guild vanity URL from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild to retrieve the vanity URL for.
 * @returns {Promise<Object>} - The response containing the vanity URL information.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/vanity-url`;

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
    console.error('Error getting guild vanity URL:', error);
    return {
      error: `An error occurred while getting the guild vanity URL: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the guild vanity URL from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_vanity_url',
      description: 'Retrieve the vanity URL for a specified guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to retrieve the vanity URL for.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };