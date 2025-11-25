/**
 * Function to retrieve a sticker in a guild from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.sticker_id - The ID of the sticker.
 * @returns {Promise<Object>} - The sticker object or an error message.
 */
const executeFunction = async ({ guild_id, sticker_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/stickers/${sticker_id}`;

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
    console.error('Error retrieving the guild sticker:', error);
    return {
      error: `An error occurred while retrieving the guild sticker: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a sticker in a guild from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_sticker',
      description: 'Retrieve a sticker in a guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          sticker_id: {
            type: 'string',
            description: 'The ID of the sticker.'
          }
        },
        required: ['guild_id', 'sticker_id']
      }
    }
  }
};

export { apiTool };