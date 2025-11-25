/**
 * Function to add a reaction to a message in a Discord channel.
 *
 * @param {Object} args - Arguments for adding a reaction.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message to react to.
 * @param {string} args.emoji_name - The name of the emoji to use for the reaction.
 * @returns {Promise<Object>} - The result of the reaction addition.
 */
const executeFunction = async ({ channel_id, message_id, emoji_name }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}/reactions/${emoji_name}/@me`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the response data
    return {
      status: response.status,
      message: 'Reaction added successfully.'
    };
  } catch (error) {
    console.error('Error adding reaction:', error);
    return {
      error: `An error occurred while adding the reaction: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for adding a reaction to a message in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_my_message_reaction',
      description: 'Add a reaction on the message for the current user.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to react to.'
          },
          emoji_name: {
            type: 'string',
            description: 'The name of the emoji to use for the reaction.'
          }
        },
        required: ['channel_id', 'message_id', 'emoji_name']
      }
    }
  }
};

export { apiTool };