/**
 * Function to update the current user's voice state in Discord.
 *
 * @param {Object} args - Arguments for updating the voice state.
 * @param {string} args.guild_id - The ID of the guild where the voice state is to be updated.
 * @param {string} [args.request_to_speak_timestamp] - The timestamp when the user requests to speak.
 * @param {boolean} [args.suppress] - Whether to suppress the user's audio.
 * @param {string} [args.channel_id] - The ID of the channel to which the user is connected.
 * @returns {Promise<Object>} - The result of the voice state update.
 */
const executeFunction = async ({ guild_id, request_to_speak_timestamp, suppress, channel_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/guilds/${guild_id}/voice-states/@me`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      request_to_speak_timestamp,
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
    return {
      status: response.status,
      message: 'Voice state updated successfully.'
    };
  } catch (error) {
    console.error('Error updating voice state:', error);
    return {
      error: `An error occurred while updating the voice state: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating the voice state in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_self_voice_state',
      description: 'Update the current user\'s voice state in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the voice state is to be updated.'
          },
          request_to_speak_timestamp: {
            type: 'string',
            description: 'The timestamp when the user requests to speak.'
          },
          suppress: {
            type: 'boolean',
            description: 'Whether to suppress the user\'s audio.'
          },
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to which the user is connected.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };