/**
 * Function to create a new emoji in a Discord guild.
 *
 * @param {Object} args - Arguments for creating the emoji.
 * @param {string} args.guild_id - The ID of the guild where the emoji will be created.
 * @param {string} args.name - The name of the emoji.
 * @param {string} args.image - The image data for the emoji (base64 encoded).
 * @param {Array<string|null>} [args.roles] - An array of role IDs that can use the emoji.
 * @returns {Promise<Object>} - The result of the emoji creation.
 */
const executeFunction = async ({ guild_id, name, image, roles = [] }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/guilds/${guild_id}/emojis`;

    // Set up the request body
    const body = JSON.stringify({ name, image, roles });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error creating guild emoji:', error);
    return {
      error: `An error occurred while creating the guild emoji: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild emoji in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_emoji',
      description: 'Create a new emoji in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the emoji will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the emoji.'
          },
          image: {
            type: 'string',
            description: 'The image data for the emoji (base64 encoded).'
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
        required: ['guild_id', 'name', 'image']
      }
    }
  }
};

export { apiTool };