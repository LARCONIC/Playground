/**
 * Function to update a sticker's metadata in a guild on Discord.
 *
 * @param {Object} args - Arguments for updating the sticker.
 * @param {string} args.guild_id - The ID of the guild where the sticker is located.
 * @param {string} args.sticker_id - The ID of the sticker to update.
 * @param {string} args.name - The new name for the sticker.
 * @param {string} args.tags - The new tags for the sticker.
 * @param {string|null} args.description - The new description for the sticker.
 * @returns {Promise<Object>} - The result of the sticker update.
 */
const executeFunction = async ({ guild_id, sticker_id, name, tags, description }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/guilds/${guild_id}/stickers/${sticker_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Create the body of the request
    const body = JSON.stringify({
      name,
      tags,
      description
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body
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
    console.error('Error updating sticker:', error);
    return {
      error: `An error occurred while updating the sticker: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a sticker in a guild on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_sticker',
      description: 'Update a sticker\'s metadata in a guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the sticker is located.'
          },
          sticker_id: {
            type: 'string',
            description: 'The ID of the sticker to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the sticker.'
          },
          tags: {
            type: 'string',
            description: 'The new tags for the sticker.'
          },
          description: {
            type: 'string',
            description: 'The new description for the sticker.'
          }
        },
        required: ['guild_id', 'sticker_id', 'name', 'tags']
      }
    }
  }
};

export { apiTool };