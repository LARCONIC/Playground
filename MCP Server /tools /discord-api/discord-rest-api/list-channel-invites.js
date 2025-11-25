/**
 * Function to list invites for a specific channel on Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel for which to list invites.
 * @returns {Promise<Object>} - The result of the list channel invites request.
 */
const executeFunction = async ({ channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the channel ID
    const url = `${baseUrl}/channels/${channel_id}/invites`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
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
    console.error('Error listing channel invites:', error);
    return {
      error: `An error occurred while listing channel invites: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing channel invites on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_channel_invites',
      description: 'List invites for a specific channel on Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel for which to list invites.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };