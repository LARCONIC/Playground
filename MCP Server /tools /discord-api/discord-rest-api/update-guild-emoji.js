/**
 * Function to update an emoji's metadata in a Discord guild.
 *
 * @param {Object} args - Arguments for the emoji update.
 * @param {string} args.guild_id - The ID of the guild where the emoji is located.
 * @param {string} args.emoji_id - The ID of the emoji to update.
 * @param {string} args.name - The new name for the emoji.
 * @param {Array<string|null>} [args.roles] - An array of role IDs that can use the emoji.
 * @returns {Promise<Object>} - The result of the emoji update.
 */
const executeFunction = async ({ guild_id, emoji_id, name, roles }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the emoji update
    const url = `${baseUrl}/guilds/${guild_id}/emojis/${emoji_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the body for the request
    const body = JSON.stringify({
      name,
      roles
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
    console.error('Error updating emoji:', error);
    return {
      error: `An error occurred while updating the emoji: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating an emoji in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_emoji',
      description: 'Update an emoji\'s metadata in a guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the emoji is located.'
          },
          emoji_id: {
            type: 'string',
            description: 'The ID of the emoji to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the emoji.'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string',
              nullable: true
            },
            description: 'An array of role IDs that can use the emoji.'
          }
        },
        required: ['guild_id', 'emoji_id', 'name']
      }
    }
  }
};

export { apiTool };