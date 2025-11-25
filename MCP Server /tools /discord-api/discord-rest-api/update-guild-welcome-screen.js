/**
 * Function to update the welcome screen for a Discord guild.
 *
 * @param {Object} args - Arguments for updating the welcome screen.
 * @param {string} args.guild_id - The ID of the guild to update.
 * @param {string} [args.description] - The description of the welcome screen.
 * @param {Array<Object>} args.welcome_channels - An array of welcome channels.
 * @param {boolean} [args.enabled] - Whether the welcome screen is enabled.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ guild_id, description = null, welcome_channels, enabled = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/guilds/${guild_id}/welcome-screen`;

  const body = {
    description,
    welcome_channels,
    enabled
  };

  try {
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
      body: JSON.stringify(body)
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
    console.error('Error updating guild welcome screen:', error);
    return {
      error: `An error occurred while updating the guild welcome screen: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating the guild welcome screen on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_welcome_screen',
      description: 'Update the welcome screen properties and channels for a guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to update.'
          },
          description: {
            type: 'string',
            description: 'The description of the welcome screen.'
          },
          welcome_channels: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                channel_id: {
                  type: 'string',
                  description: 'The ID of the channel.'
                },
                description: {
                  type: 'string',
                  description: 'The description of the channel.'
                },
                emoji_id: {
                  type: 'string',
                  nullable: true,
                  description: 'The ID of the emoji.'
                },
                emoji_name: {
                  type: 'string',
                  nullable: true,
                  description: 'The name of the emoji.'
                }
              },
              required: ['channel_id', 'description']
            },
            description: 'An array of welcome channels.'
          },
          enabled: {
            type: 'boolean',
            description: 'Whether the welcome screen is enabled.'
          }
        },
        required: ['guild_id', 'welcome_channels']
      }
    }
  }
};

export { apiTool };