/**
 * Function to create a guild sticker in Discord.
 *
 * @param {Object} args - Arguments for creating the sticker.
 * @param {string} args.guild_id - The ID of the guild where the sticker will be created.
 * @param {string} args.name - The name of the sticker.
 * @param {string} args.tags - The tags associated with the sticker.
 * @param {string} args.file - The file data for the sticker.
 * @param {string} [args.description] - An optional description for the sticker.
 * @returns {Promise<Object>} - The result of the sticker creation.
 */
const executeFunction = async ({ guild_id, name, tags, file, description }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  const formData = new FormData();
  
  formData.append('name', name);
  formData.append('tags', tags);
  formData.append('file', file);
  if (description) {
    formData.append('description', description);
  }

  try {
    const response = await fetch(`${baseUrl}/guilds/${guild_id}/stickers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Accept': 'application/json'
      },
      body: formData
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
    console.error('Error creating guild sticker:', error);
    return {
      error: `An error occurred while creating the guild sticker: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild sticker in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_sticker',
      description: 'Create a sticker in a guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the sticker will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the sticker.'
          },
          tags: {
            type: 'string',
            description: 'The tags associated with the sticker.'
          },
          file: {
            type: 'string',
            description: 'The file data for the sticker.'
          },
          description: {
            type: 'string',
            description: 'An optional description for the sticker.'
          }
        },
        required: ['guild_id', 'name', 'tags', 'file']
      }
    }
  }
};

export { apiTool };