/**
 * Function to bulk update guild channels in Discord.
 *
 * @param {Object} args - Arguments for the bulk update.
 * @param {string} args.guild_id - The ID of the guild (server) where the channels are located.
 * @param {Array<Object>} args.channels - An array of channel objects to update.
 * @param {string} args.channels[].id - The ID of the channel to update.
 * @param {number|null} [args.channels[].position] - The new position of the channel (optional).
 * @param {string|null} [args.channels[].parent_id] - The ID of the parent category (optional).
 * @param {boolean|null} [args.channels[].lock_permissions] - Whether to lock permissions (optional).
 * @returns {Promise<Object>} - The result of the bulk update operation.
 */
const executeFunction = async ({ guild_id, channels }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/guilds/${guild_id}/channels`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(channels)
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
    console.error('Error updating guild channels:', error);
    return {
      error: `An error occurred while updating guild channels: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for bulk updating guild channels in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'bulk_update_guild_channels',
      description: 'Bulk update the positions of channels in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild (server) where the channels are located.'
          },
          channels: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'The ID of the channel to update.'
                },
                position: {
                  type: 'integer',
                  nullable: true,
                  description: 'The new position of the channel (optional).'
                },
                parent_id: {
                  type: 'string',
                  nullable: true,
                  description: 'The ID of the parent category (optional).'
                },
                lock_permissions: {
                  type: 'boolean',
                  nullable: true,
                  description: 'Whether to lock permissions (optional).'
                }
              },
              required: ['id']
            },
            description: 'An array of channel objects to update.'
          }
        },
        required: ['guild_id', 'channels']
      }
    }
  }
};

export { apiTool };