/**
 * Function to create a stage instance in Discord.
 *
 * @param {Object} args - Arguments for creating a stage instance.
 * @param {string} args.topic - The topic of the stage instance.
 * @param {string} args.channel_id - The ID of the channel associated with the stage instance.
 * @param {number|null} [args.privacy_level=null] - The privacy level of the stage instance (1 for PUBLIC).
 * @param {string|null} [args.guild_scheduled_event_id=null] - The ID of the scheduled event associated with the stage instance.
 * @param {boolean|null} [args.send_start_notification=null] - Whether to send a notification when the stage instance starts.
 * @returns {Promise<Object>} - The result of the stage instance creation.
 */
const executeFunction = async ({ topic, channel_id, privacy_level = null, guild_scheduled_event_id = null, send_start_notification = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/stage-instances`;

  const body = {
    topic,
    channel_id,
    privacy_level,
    guild_scheduled_event_id,
    send_start_notification
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bot ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating stage instance:', error);
    return {
      error: `An error occurred while creating the stage instance: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a stage instance in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_stage_instance',
      description: 'Create a stage instance associated with the stage channel.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'The topic of the stage instance.'
          },
          channel_id: {
            type: 'string',
            description: 'The ID of the channel associated with the stage instance.'
          },
          privacy_level: {
            type: 'number',
            nullable: true,
            description: 'The privacy level of the stage instance (1 for PUBLIC).'
          },
          guild_scheduled_event_id: {
            type: 'string',
            nullable: true,
            description: 'The ID of the scheduled event associated with the stage instance.'
          },
          send_start_notification: {
            type: 'boolean',
            nullable: true,
            description: 'Whether to send a notification when the stage instance starts.'
          }
        },
        required: ['topic', 'channel_id']
      }
    }
  }
};

export { apiTool };