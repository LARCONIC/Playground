/**
 * Function to create an invite for a Discord channel.
 *
 * @param {Object} args - Arguments for creating the channel invite.
 * @param {string} args.channel_id - The ID of the channel to create an invite for.
 * @param {number} [args.max_age=null] - The maximum age of the invite in seconds.
 * @returns {Promise<Object>} - The result of the invite creation.
 */
const executeFunction = async ({ channel_id, max_age = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL for the invite creation
    const url = `${baseUrl}/channels/${channel_id}/invites`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ max_age });

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
    console.error('Error creating channel invite:', error);
    return {
      error: `An error occurred while creating the channel invite: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a channel invite on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_channel_invite',
      description: 'Create an invite for a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to create an invite for.'
          },
          max_age: {
            type: 'integer',
            description: 'The maximum age of the invite in seconds.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };