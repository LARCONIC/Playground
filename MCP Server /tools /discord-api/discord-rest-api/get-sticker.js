/**
 * Function to retrieve a sticker from Discord.
 *
 * @param {Object} args - Arguments for the sticker retrieval.
 * @param {string} args.sticker_id - The ID of the sticker to retrieve.
 * @returns {Promise<Object>} - The sticker object or an error message.
 */
const executeFunction = async ({ sticker_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the sticker ID
    const url = `${baseUrl}/stickers/${sticker_id}`;

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
    console.error('Error retrieving sticker:', error);
    return {
      error: `An error occurred while retrieving the sticker: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a sticker from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_sticker',
      description: 'Retrieve a sticker from Discord.',
      parameters: {
        type: 'object',
        properties: {
          sticker_id: {
            type: 'string',
            description: 'The ID of the sticker to retrieve.'
          }
        },
        required: ['sticker_id']
      }
    }
  }
};

export { apiTool };