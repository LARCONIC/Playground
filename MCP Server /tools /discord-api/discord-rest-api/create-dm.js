/**
 * Function to create a direct message channel with a user on Discord.
 *
 * @param {Object} args - Arguments for creating a DM channel.
 * @param {string} args.recipient_id - The ID of the recipient user.
 * @param {Array<string>} args.access_tokens - An array of access tokens for the recipient.
 * @param {Array<string>} [args.nicks=null] - Optional array of nicknames for the recipients.
 * @returns {Promise<Object>} - The result of the DM channel creation.
 */
const executeFunction = async ({ recipient_id, access_tokens, nicks = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for creating a DM channel
    const url = `${baseUrl}/users/@me/channels`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      recipient_id,
      access_tokens,
      nicks
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
    console.error('Error creating DM channel:', error);
    return {
      error: `An error occurred while creating the DM channel: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a DM channel on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_dm',
      description: 'Create a direct message channel with a user on Discord.',
      parameters: {
        type: 'object',
        properties: {
          recipient_id: {
            type: 'string',
            description: 'The ID of the recipient user.'
          },
          access_tokens: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of access tokens for the recipient.'
          },
          nicks: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Optional array of nicknames for the recipients.'
          }
        },
        required: ['recipient_id', 'access_tokens']
      }
    }
  }
};

export { apiTool };