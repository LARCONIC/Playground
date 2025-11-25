/**
 * Function to create a thread from an existing message in Discord.
 *
 * @param {Object} args - Arguments for creating the thread.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message to create a thread from.
 * @param {string} args.name - The name of the thread.
 * @param {number|null} [args.auto_archive_duration=null] - The duration in minutes for auto-archiving the thread.
 * @param {number|null} [args.rate_limit_per_user=null] - The rate limit per user for the thread.
 * @returns {Promise<Object>} - The result of the thread creation.
 */
const executeFunction = async ({ channel_id, message_id, name, auto_archive_duration = null, rate_limit_per_user = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}/threads`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Construct the request body
    const body = JSON.stringify({
      name,
      auto_archive_duration,
      rate_limit_per_user
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error creating thread from message:', error);
    return {
      error: `An error occurred while creating the thread: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a thread from a message in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_thread_from_message',
      description: 'Create a new thread from an existing message in Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to create a thread from.'
          },
          name: {
            type: 'string',
            description: 'The name of the thread.'
          },
          auto_archive_duration: {
            type: 'integer',
            nullable: true,
            description: 'The duration in minutes for auto-archiving the thread.'
          },
          rate_limit_per_user: {
            type: 'integer',
            nullable: true,
            description: 'The rate limit per user for the thread.'
          }
        },
        required: ['channel_id', 'message_id', 'name']
      }
    }
  }
};

export { apiTool };