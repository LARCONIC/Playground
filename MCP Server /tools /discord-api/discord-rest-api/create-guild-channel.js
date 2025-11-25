/**
 * Function to create a channel in a Discord guild.
 *
 * @param {Object} args - Arguments for creating the channel.
 * @param {string} args.guild_id - The ID of the guild where the channel will be created.
 * @param {string} args.name - The name of the channel.
 * @param {number|null} [args.type=null] - The type of the channel (e.g., text, voice).
 * @param {number|null} [args.position=null] - The position of the channel in the list.
 * @param {string|null} [args.topic=null] - The topic of the channel (for text channels).
 * @param {number|null} [args.bitrate=null] - The bitrate of the channel (for voice channels).
 * @param {number|null} [args.user_limit=null] - The user limit for the channel (for voice channels).
 * @param {boolean|null} [args.nsfw=null] - Whether the channel is marked as NSFW.
 * @param {number|null} [args.rate_limit_per_user=null] - The rate limit per user for the channel.
 * @param {string|null} [args.parent_id=null] - The ID of the parent category (if applicable).
 * @param {Array<Object>} [args.permission_overwrites=[]] - Permission overwrites for the channel.
 * @param {string|null} [args.rtc_region=null] - The RTC region for the channel (for voice channels).
 * @param {string|null} [args.video_quality_mode=null] - The video quality mode for the channel (for voice channels).
 * @param {Array<string>} [args.available_tags=[]] - Available tags for the channel.
 * @returns {Promise<Object>} - The result of the channel creation.
 */
const executeFunction = async ({ guild_id, name, type = null, position = null, topic = null, bitrate = null, user_limit = null, nsfw = null, rate_limit_per_user = null, parent_id = null, permission_overwrites = [], rtc_region = null, video_quality_mode = null, available_tags = [] }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the channel creation
    const url = `${baseUrl}/guilds/${guild_id}/channels`;

    // Prepare the request body
    const body = {
      name,
      type,
      position,
      topic,
      bitrate,
      user_limit,
      nsfw,
      rate_limit_per_user,
      parent_id,
      permission_overwrites,
      rtc_region,
      video_quality_mode,
      available_tags
    };

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error creating guild channel:', error);
    return {
      error: `An error occurred while creating the guild channel: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild channel in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_channel',
      description: 'Create a channel in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the channel will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the channel.'
          },
          type: {
            type: 'integer',
            description: 'The type of the channel (e.g., text, voice).'
          },
          position: {
            type: 'integer',
            description: 'The position of the channel in the list.'
          },
          topic: {
            type: 'string',
            description: 'The topic of the channel (for text channels).'
          },
          bitrate: {
            type: 'integer',
            description: 'The bitrate of the channel (for voice channels).'
          },
          user_limit: {
            type: 'integer',
            description: 'The user limit for the channel (for voice channels).'
          },
          nsfw: {
            type: 'boolean',
            description: 'Whether the channel is marked as NSFW.'
          },
          rate_limit_per_user: {
            type: 'integer',
            description: 'The rate limit per user for the channel.'
          },
          parent_id: {
            type: 'string',
            description: 'The ID of the parent category (if applicable).'
          },
          permission_overwrites: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'The ID of the role or user.'
                },
                type: {
                  type: 'integer',
                  description: 'The type of permission overwrite (0 for role, 1 for member).'
                },
                allow: {
                  type: 'string',
                  description: 'The permissions to allow.'
                },
                deny: {
                  type: 'string',
                  description: 'The permissions to deny.'
                }
              }
            },
            description: 'Permission overwrites for the channel.'
          },
          rtc_region: {
            type: 'string',
            description: 'The RTC region for the channel (for voice channels).'
          },
          video_quality_mode: {
            type: 'string',
            description: 'The video quality mode for the channel (for voice channels).'
          },
          available_tags: {
            type: 'array',
            items: {
              type: 'string',
              description: 'Available tags for the channel.'
            },
            description: 'Available tags for the channel.'
          }
        },
        required: ['guild_id', 'name']
      }
    }
  }
};

export { apiTool };