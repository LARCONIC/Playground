/**
 * Function to update the guild widget settings on Discord.
 *
 * @param {Object} args - Arguments for updating the guild widget settings.
 * @param {string} args.guild_id - The ID of the guild to update the widget settings for.
 * @param {string|null} [args.channel_id] - The ID of the channel to set as the widget channel.
 * @param {boolean|null} [args.enabled] - Whether the widget is enabled or not.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ guild_id, channel_id = null, enabled = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/guilds/${guild_id}/widget`;

  const body = JSON.stringify({
    channel_id,
    enabled
  });

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
    console.error('Error updating guild widget settings:', error);
    return {
      error: `An error occurred while updating guild widget settings: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating guild widget settings on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_widget_settings',
      description: 'Update the widget settings for a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to update the widget settings for.'
          },
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to set as the widget channel.'
          },
          enabled: {
            type: 'boolean',
            description: 'Whether the widget is enabled or not.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };