/**
 * Function to update settings for a Discord guild.
 *
 * @param {Object} args - The arguments for updating the guild.
 * @param {string} args.guild_id - The ID of the guild to update.
 * @param {string} [args.name] - The new name of the guild.
 * @param {string|null} [args.description] - The new description of the guild.
 * @param {string|null} [args.region] - The new region of the guild.
 * @param {string|null} [args.icon] - The new icon of the guild.
 * @param {number|null} [args.verification_level] - The new verification level of the guild.
 * @param {number|null} [args.default_message_notifications] - The new default message notifications level.
 * @param {number|null} [args.explicit_content_filter] - The new explicit content filter level.
 * @param {string|null} [args.preferred_locale] - The new preferred locale of the guild.
 * @param {number|null} [args.afk_timeout] - The new AFK timeout in seconds.
 * @param {string|null} [args.afk_channel_id] - The ID of the new AFK channel.
 * @param {string|null} [args.system_channel_id] - The ID of the new system channel.
 * @param {string} args.owner_id - The ID of the owner of the guild.
 * @param {string|null} [args.splash] - The new splash image of the guild.
 * @param {string|null} [args.banner] - The new banner image of the guild.
 * @param {number|null} [args.system_channel_flags] - The new system channel flags.
 * @param {Array|null} [args.features] - The new features of the guild.
 * @param {string|null} [args.discovery_splash] - The new discovery splash image of the guild.
 * @param {string|null} [args.home_header] - The new home header of the guild.
 * @param {string|null} [args.rules_channel_id] - The ID of the new rules channel.
 * @param {string|null} [args.safety_alerts_channel_id] - The ID of the new safety alerts channel.
 * @param {string|null} [args.public_updates_channel_id] - The ID of the new public updates channel.
 * @param {boolean|null} [args.premium_progress_bar_enabled] - Whether the premium progress bar is enabled.
 * @returns {Promise<Object>} - The result of the guild update.
 */
const executeFunction = async (args) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const { guild_id, ...updateData } = args;

  try {
    // Construct the URL for the guild update
    const url = `${baseUrl}/guilds/${guild_id}`;

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
      body: JSON.stringify(updateData)
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
    console.error('Error updating guild:', error);
    return {
      error: `An error occurred while updating the guild: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild',
      description: 'Update settings for a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to update.'
          },
          name: {
            type: 'string',
            description: 'The new name of the guild.'
          },
          description: {
            type: 'string',
            nullable: true,
            description: 'The new description of the guild.'
          },
          region: {
            type: 'string',
            nullable: true,
            description: 'The new region of the guild.'
          },
          icon: {
            type: 'string',
            nullable: true,
            description: 'The new icon of the guild.'
          },
          verification_level: {
            type: 'integer',
            nullable: true,
            description: 'The new verification level of the guild.'
          },
          default_message_notifications: {
            type: 'integer',
            nullable: true,
            description: 'The new default message notifications level.'
          },
          explicit_content_filter: {
            type: 'integer',
            nullable: true,
            description: 'The new explicit content filter level.'
          },
          preferred_locale: {
            type: 'string',
            nullable: true,
            description: 'The new preferred locale of the guild.'
          },
          afk_timeout: {
            type: 'integer',
            nullable: true,
            description: 'The new AFK timeout in seconds.'
          },
          afk_channel_id: {
            type: 'string',
            nullable: true,
            description: 'The ID of the new AFK channel.'
          },
          system_channel_id: {
            type: 'string',
            nullable: true,
            description: 'The ID of the new system channel.'
          },
          owner_id: {
            type: 'string',
            description: 'The ID of the owner of the guild.'
          },
          splash: {
            type: 'string',
            nullable: true,
            description: 'The new splash image of the guild.'
          },
          banner: {
            type: 'string',
            nullable: true,
            description: 'The new banner image of the guild.'
          },
          system_channel_flags: {
            type: 'integer',
            nullable: true,
            description: 'The new system channel flags.'
          },
          features: {
            type: 'array',
            nullable: true,
            description: 'The new features of the guild.'
          },
          discovery_splash: {
            type: 'string',
            nullable: true,
            description: 'The new discovery splash image of the guild.'
          },
          home_header: {
            type: 'string',
            nullable: true,
            description: 'The new home header of the guild.'
          },
          rules_channel_id: {
            type: 'string',
            nullable: true,
            description: 'The ID of the new rules channel.'
          },
          safety_alerts_channel_id: {
            type: 'string',
            nullable: true,
            description: 'The ID of the new safety alerts channel.'
          },
          public_updates_channel_id: {
            type: 'string',
            nullable: true,
            description: 'The ID of the new public updates channel.'
          },
          premium_progress_bar_enabled: {
            type: 'boolean',
            nullable: true,
            description: 'Whether the premium progress bar is enabled.'
          }
        },
        required: ['guild_id', 'owner_id']
      }
    }
  }
};

export { apiTool };