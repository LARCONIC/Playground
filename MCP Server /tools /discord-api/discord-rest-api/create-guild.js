/**
 * Function to create a new guild on Discord.
 *
 * @param {Object} args - Arguments for creating the guild.
 * @param {string} args.name - The name of the guild.
 * @param {string} [args.description] - The description of the guild.
 * @param {string} [args.region] - The region of the guild.
 * @param {string} [args.icon] - The icon of the guild.
 * @param {number} [args.verification_level] - The verification level of the guild.
 * @param {number} [args.default_message_notifications] - The default message notifications level.
 * @param {number} [args.explicit_content_filter] - The explicit content filter level.
 * @param {string} [args.preferred_locale] - The preferred locale of the guild.
 * @param {number} [args.afk_timeout] - The AFK timeout in seconds.
 * @param {Array<Object>} [args.roles] - The roles to be created in the guild.
 * @param {string} [args.afk_channel_id] - The ID of the AFK channel.
 * @param {string} [args.system_channel_id] - The ID of the system channel.
 * @param {number} [args.system_channel_flags] - The system channel flags.
 * @returns {Promise<Object>} - The result of the guild creation.
 */
const executeFunction = async ({
  name,
  description = null,
  region = null,
  icon = null,
  verification_level = null,
  default_message_notifications = null,
  explicit_content_filter = null,
  preferred_locale = null,
  afk_timeout = null,
  roles = [],
  afk_channel_id = null,
  system_channel_id = null,
  system_channel_flags = null
}) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the request body
    const body = {
      name,
      description,
      region,
      icon,
      verification_level,
      default_message_notifications,
      explicit_content_filter,
      preferred_locale,
      afk_timeout,
      roles,
      afk_channel_id,
      system_channel_id,
      system_channel_flags
    };

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/guilds`, {
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
    console.error('Error creating guild:', error);
    return {
      error: `An error occurred while creating the guild: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild',
      description: 'Create a new guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the guild.'
          },
          description: {
            type: 'string',
            description: 'The description of the guild.'
          },
          region: {
            type: 'string',
            description: 'The region of the guild.'
          },
          icon: {
            type: 'string',
            description: 'The icon of the guild.'
          },
          verification_level: {
            type: 'integer',
            description: 'The verification level of the guild.'
          },
          default_message_notifications: {
            type: 'integer',
            description: 'The default message notifications level.'
          },
          explicit_content_filter: {
            type: 'integer',
            description: 'The explicit content filter level.'
          },
          preferred_locale: {
            type: 'string',
            description: 'The preferred locale of the guild.'
          },
          afk_timeout: {
            type: 'integer',
            description: 'The AFK timeout in seconds.'
          },
          roles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  description: 'The ID of the role.'
                },
                name: {
                  type: 'string',
                  description: 'The name of the role.'
                },
                permissions: {
                  type: 'integer',
                  description: 'The permissions of the role.'
                },
                color: {
                  type: 'integer',
                  description: 'The color of the role.'
                },
                hoist: {
                  type: 'boolean',
                  description: 'Whether the role is hoisted.'
                },
                mentionable: {
                  type: 'boolean',
                  description: 'Whether the role is mentionable.'
                },
                unicode_emoji: {
                  type: 'string',
                  description: 'The unicode emoji of the role.'
                }
              }
            },
            description: 'The roles to be created in the guild.'
          },
          afk_channel_id: {
            type: 'string',
            description: 'The ID of the AFK channel.'
          },
          system_channel_id: {
            type: 'string',
            description: 'The ID of the system channel.'
          },
          system_channel_flags: {
            type: 'integer',
            description: 'The system channel flags.'
          }
        },
        required: ['name']
      }
    }
  }
};

export { apiTool };