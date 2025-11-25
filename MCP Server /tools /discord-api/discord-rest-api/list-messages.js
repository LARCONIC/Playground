/**
 * Function to list messages in a Discord channel.
 *
 * @param {Object} args - Arguments for listing messages.
 * @param {string} args.channel_id - The ID of the channel to list messages from.
 * @param {string} [args.around] - Message ID to get messages around.
 * @param {string} [args.before] - Get messages before this message ID.
 * @param {string} [args.after] - Get messages after this message ID.
 * @param {number} [args.limit=50] - The maximum number of messages to return.
 * @returns {Promise<Object>} - The result of the messages listing.
 */
const executeFunction = async ({ channel_id, around, before, after, limit = 50 }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/channels/${channel_id}/messages`);
    if (around) url.searchParams.append('around', around);
    if (before) url.searchParams.append('before', before);
    if (after) url.searchParams.append('after', after);
    url.searchParams.append('limit', limit.toString());

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
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
    console.error('Error listing messages:', error);
    return {
      error: `An error occurred while listing messages: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing messages in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_messages',
      description: 'List messages in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to list messages from.'
          },
          around: {
            type: 'string',
            description: 'Message ID to get messages around.'
          },
          before: {
            type: 'string',
            description: 'Get messages before this message ID.'
          },
          after: {
            type: 'string',
            description: 'Get messages after this message ID.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of messages to return.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };