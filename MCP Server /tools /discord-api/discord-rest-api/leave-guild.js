/**
 * Function to leave a guild on behalf of the current user in Discord.
 *
 * @param {Object} args - Arguments for leaving the guild.
 * @param {string} args.guild_id - The ID of the guild to leave.
 * @returns {Promise<Object>} - The result of the leave guild operation.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/users/@me/guilds/${guild_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return a success message or response
    return {
      message: 'Successfully left the guild.',
      status: response.status
    };
  } catch (error) {
    console.error('Error leaving the guild:', error);
    return {
      error: `An error occurred while leaving the guild: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for leaving a guild on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'leave_guild',
      description: 'Leave a guild on behalf of the current user.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to leave.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };