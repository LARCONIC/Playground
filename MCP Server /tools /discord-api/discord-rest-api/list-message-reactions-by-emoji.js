/**
 * Function to list users who reacted to a message with a given emoji on Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel containing the message.
 * @param {string} args.message_id - The ID of the message to check reactions for.
 * @param {string} args.emoji_name - The name of the emoji used for reactions.
 * @param {string} [args.after] - The ID of the message after which to return reactions.
 * @param {number} [args.limit] - The maximum number of reactions to return.
 * @returns {Promise<Object>} - The list of users who reacted to the message.
 */
const executeFunction = async ({ channel_id, message_id, emoji_name, after, limit }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/channels/${channel_id}/messages/${message_id}/reactions/${emoji_name}`);
    if (after) url.searchParams.append('after', after);
    if (limit) url.searchParams.append('limit', limit.toString());

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
    console.error('Error listing message reactions:', error);
    return {
      error: `An error occurred while listing message reactions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing message reactions by emoji on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_message_reactions_by_emoji',
      description: 'List users who reacted to a message with a given emoji.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel containing the message.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to check reactions for.'
          },
          emoji_name: {
            type: 'string',
            description: 'The name of the emoji used for reactions.'
          },
          after: {
            type: 'string',
            description: 'The ID of the message after which to return reactions.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of reactions to return.'
          }
        },
        required: ['channel_id', 'message_id', 'emoji_name']
      }
    }
  }
};

export { apiTool };