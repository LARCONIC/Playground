/**
 * Function to update a user's voice state in a Discord guild.
 *
 * @param {Object} args - Arguments for updating the voice state.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.user_id - The ID of the user whose voice state is being updated.
 * @param {boolean|null} [args.suppress=null] - Whether the user is suppressed (muted) in the voice channel.
 * @param {string|null} [args.channel_id=null] - The ID of the channel to which the user should be moved.
 * @returns {Promise<Object>} - The result of the voice state update.
 */
const executeFunction = async ({ guild_id, user_id, suppress = null, channel_id = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/guilds/${guild_id}/voice-states/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Create the body for the request
    const body = JSON.stringify({
      suppress,
      channel_id
    });

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

    // Return the response data
    return await response.json();
  } catch (error) {
    console.error('Error updating voice state:', error);
    return {
      error: `An error occurred while updating voice state: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a user's voice state in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_voice_state',
      description: 'Update a user\'s voice state in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user whose voice state is being updated.'
          },
          suppress: {
            type: 'boolean',
            description: 'Whether the user is suppressed (muted) in the voice channel.'
          },
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to which the user should be moved.'
          }
        },
        required: ['guild_id', 'user_id']
      }
    }
  }
};

export { apiTool };