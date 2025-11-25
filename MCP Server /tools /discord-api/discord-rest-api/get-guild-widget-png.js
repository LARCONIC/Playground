/**
 * Function to retrieve a PNG image widget for a Discord guild.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild to retrieve the widget for.
 * @param {string} [args.style=null] - The style of the widget (optional).
 * @returns {Promise<Buffer>} - The PNG image of the guild widget.
 */
const executeFunction = async ({ guild_id, style = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL with the guild ID and style
    const url = new URL(`${baseUrl}/guilds/${guild_id}/widget.png`);
    if (style) {
      url.searchParams.append('style', style);
    }

    // Set up headers for the request
    const headers = {
      'Accept': 'image/png',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the image as a Buffer
    const imageBuffer = await response.buffer();
    return imageBuffer;
  } catch (error) {
    console.error('Error retrieving guild widget PNG:', error);
    return {
      error: `An error occurred while retrieving the guild widget PNG: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a guild widget PNG from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_widget_png',
      description: 'Retrieve a PNG image widget for a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to retrieve the widget for.'
          },
          style: {
            type: 'string',
            description: 'The style of the widget (optional).'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };