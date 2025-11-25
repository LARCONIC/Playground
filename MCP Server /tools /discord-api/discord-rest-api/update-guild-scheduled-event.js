/**
 * Function to update a scheduled event in a Discord guild.
 *
 * @param {Object} args - Arguments for updating the scheduled event.
 * @param {string} args.guild_id - The ID of the guild where the event is scheduled.
 * @param {string} args.guild_scheduled_event_id - The ID of the scheduled event to update.
 * @param {Object} args.eventData - The data to update the scheduled event.
 * @param {string} args.eventData.name - The name of the scheduled event.
 * @param {string} [args.eventData.description] - The description of the scheduled event.
 * @param {string} [args.eventData.image] - The image associated with the scheduled event.
 * @param {string} args.eventData.scheduled_start_time - The start time of the scheduled event.
 * @param {string} [args.eventData.scheduled_end_time] - The end time of the scheduled event.
 * @param {string} [args.eventData.entity_type] - The type of the scheduled event.
 * @param {Object} args.eventData.privacy_level - The privacy level of the scheduled event.
 * @param {string} args.eventData.channel_id - The ID of the channel where the event will be held.
 * @param {Object} args.eventData.entity_metadata - Metadata for the event entity.
 * @param {string} args.eventData.entity_metadata.location - The location of the event.
 * @returns {Promise<Object>} - The result of the scheduled event update.
 */
const executeFunction = async ({ guild_id, guild_scheduled_event_id, eventData }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/guilds/${guild_id}/scheduled-events/${guild_scheduled_event_id}`;
  
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
      body: JSON.stringify(eventData)
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
    console.error('Error updating scheduled event:', error);
    return {
      error: `An error occurred while updating the scheduled event: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a scheduled event in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_scheduled_event',
      description: 'Update a scheduled event in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the event is scheduled.'
          },
          guild_scheduled_event_id: {
            type: 'string',
            description: 'The ID of the scheduled event to update.'
          },
          eventData: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The name of the scheduled event.'
              },
              description: {
                type: 'string',
                description: 'The description of the scheduled event.'
              },
              image: {
                type: 'string',
                description: 'The image associated with the scheduled event.'
              },
              scheduled_start_time: {
                type: 'string',
                description: 'The start time of the scheduled event.'
              },
              scheduled_end_time: {
                type: 'string',
                description: 'The end time of the scheduled event.'
              },
              entity_type: {
                type: 'string',
                description: 'The type of the scheduled event.'
              },
              privacy_level: {
                type: 'object',
                description: 'The privacy level of the scheduled event.'
              },
              channel_id: {
                type: 'string',
                description: 'The ID of the channel where the event will be held.'
              },
              entity_metadata: {
                type: 'object',
                properties: {
                  location: {
                    type: 'string',
                    description: 'The location of the event.'
                  }
                },
                description: 'Metadata for the event entity.'
              }
            },
            required: ['name', 'scheduled_start_time', 'channel_id', 'entity_metadata']
          }
        },
        required: ['guild_id', 'guild_scheduled_event_id', 'eventData']
      }
    }
  }
};

export { apiTool };