/**
 * Function to list all pinned messages in a Discord channel.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel to list pinned messages from.
 * @returns {Promise<Object>} - The response containing the list of pinned messages.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the channel ID
    const url = `${baseUrl}/channels/${channel_id}/pins`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error listing pinned messages:', error);
    return {
      error: `An error occurred while listing pinned messages: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing pinned messages in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_pinned_messages',
      description: 'List all pinned messages in a channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to list pinned messages from.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };