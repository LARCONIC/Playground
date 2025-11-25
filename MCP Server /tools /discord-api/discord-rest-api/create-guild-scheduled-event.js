/**
 * Function to create a scheduled event in a Discord guild.
 *
 * @param {Object} args - Arguments for creating the scheduled event.
 * @param {string} args.guild_id - The ID of the guild where the event will be created.
 * @param {string} args.name - The name of the scheduled event.
 * @param {string} args.scheduled_start_time - The start time of the scheduled event in ISO 8601 format.
 * @param {string} [args.description=null] - A description of the scheduled event.
 * @param {string} [args.image=null] - An image associated with the scheduled event.
 * @param {string} [args.scheduled_end_time=null] - The end time of the scheduled event in ISO 8601 format.
 * @param {string} [args.channel_id=null] - The ID of the channel where the event will be held.
 * @param {string} args.location - The location of the event.
 * @returns {Promise<Object>} - The result of the scheduled event creation.
 */
const executeFunction = async ({ guild_id, name, scheduled_start_time, description = null, image = null, scheduled_end_time = null, channel_id = null, location }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/guilds/${guild_id}/scheduled-events`;

    // Prepare the event data
    const eventData = {
      name,
      scheduled_start_time,
      privacy_level: { title: "GUILD_ONLY", const: 2 },
      entity_type: 3,
      entity_metadata: { location },
      description,
      image,
      scheduled_end_time,
      channel_id
    };

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error creating scheduled event:', error);
    return {
      error: `An error occurred while creating the scheduled event: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a scheduled event in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_scheduled_event',
      description: 'Create a scheduled event in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the event will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the scheduled event.'
          },
          scheduled_start_time: {
            type: 'string',
            description: 'The start time of the scheduled event in ISO 8601 format.'
          },
          description: {
            type: 'string',
            description: 'A description of the scheduled event.'
          },
          image: {
            type: 'string',
            description: 'An image associated with the scheduled event.'
          },
          scheduled_end_time: {
            type: 'string',
            description: 'The end time of the scheduled event in ISO 8601 format.'
          },
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the event will be held.'
          },
          location: {
            type: 'string',
            description: 'The location of the event.'
          }
        },
        required: ['guild_id', 'name', 'scheduled_start_time', 'location']
      }
    }
  }
};

export { apiTool };