/**
 * Function to crosspost a message in an announcement channel to all following channels on Discord.
 *
 * @param {Object} args - Arguments for the crosspost.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message to be crossposted.
 * @returns {Promise<Object>} - The result of the crosspost operation.
 */
const executeFunction = async ({ channel_id, message_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the crosspost request
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}/crosspost`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error crossposting message:', error);
    return {
      error: `An error occurred while crossposting the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for crossposting messages on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'crosspost_message',
      description: 'Crosspost a message in an announcement channel to all following channels.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to be crossposted.'
          }
        },
        required: ['channel_id', 'message_id']
      }
    }
  }
};

export { apiTool };