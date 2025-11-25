/**
 * Function to retrieve the new member welcome message for a guild on Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.guild_id - The ID of the guild to retrieve the welcome message for.
 * @returns {Promise<Object>} - The response from the Discord API containing the welcome message details.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/new-member-welcome`;

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
    console.error('Error retrieving new member welcome message:', error);
    return {
      error: `An error occurred while retrieving the welcome message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving the new member welcome message for a guild on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild_new_member_welcome',
      description: 'Retrieve the new member welcome message for a guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to retrieve the welcome message for.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };