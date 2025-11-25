/**
 * Function to update the onboarding configuration for a Discord guild.
 *
 * @param {Object} args - Arguments for the onboarding update.
 * @param {string} args.guild_id - The ID of the guild to update onboarding for.
 * @param {boolean|null} [args.enabled=null] - Whether onboarding is enabled.
 * @param {Array<string>} [args.default_channel_ids] - The default channel IDs for onboarding.
 * @param {string|null} [args.mode=null] - The mode of onboarding.
 * @returns {Promise<Object>} - The result of the onboarding update.
 */
const executeFunction = async ({ guild_id, enabled = null, default_channel_ids = [], mode = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/guilds/${guild_id}/onboarding`;

  const body = JSON.stringify({
    prompts: null,
    enabled,
    default_channel_ids,
    mode
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
      method: 'PUT',
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
    console.error('Error updating guild onboarding:', error);
    return {
      error: `An error occurred while updating guild onboarding: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating onboarding configuration for a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'put_guilds_onboarding',
      description: 'Update the onboarding configuration for a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to update onboarding for.'
          },
          enabled: {
            type: 'boolean',
            description: 'Whether onboarding is enabled.'
          },
          default_channel_ids: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The default channel IDs for onboarding.'
          },
          mode: {
            type: 'string',
            description: 'The mode of onboarding.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };