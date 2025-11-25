/**
 * Function to retrieve an emoji from a guild on Discord.
 *
 * @param {Object} args - Arguments for the emoji retrieval.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.emoji_id - The ID of the emoji.
 * @returns {Promise<Object>} - The emoji object from the guild.
 */
const executeFunction = async ({ guild_id, emoji_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/guilds/${guild_id}/emojis/${emoji_id}`;

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
    console.error('Error retrieving guild emoji:', error);
    return {
      error: `An error occurred while retrieving the guild emoji: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a guild emoji on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_emoji',
      description: 'Retrieve an emoji from a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          emoji_id: {
            type: 'string',
            description: 'The ID of the emoji.'
          }
        },
        required: ['guild_id', 'emoji_id']
      }
    }
  }
};

export { apiTool };