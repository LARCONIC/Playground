/**
 * Function to update settings for a Discord channel.
 *
 * @param {Object} args - Arguments for updating the channel.
 * @param {string} args.channel_id - The ID of the channel to update.
 * @param {string} [args.name] - The new name for the channel.
 * @param {string} [args.icon] - The new icon for the channel.
 * @returns {Promise<Object>} - The result of the channel update.
 */
const executeFunction = async ({ channel_id, name, icon }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the channel update
    const url = `${baseUrl}/channels/${channel_id}`;

    // Prepare the request body
    const body = JSON.stringify({
      name,
      icon
    });

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
    console.error('Error updating channel:', error);
    return {
      error: `An error occurred while updating the channel: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_channel',
      description: 'Update settings for a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the channel.'
          },
          icon: {
            type: 'string',
            description: 'The new icon for the channel.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };