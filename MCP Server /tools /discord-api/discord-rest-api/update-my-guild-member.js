/**
 * Function to update the current member in a Discord guild.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string|null} [args.nick=null] - The new nickname for the member. Pass null to reset the nickname.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ guild_id, nick = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/guilds/${guild_id}/members/@me`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ nick });

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
    console.error('Error updating guild member:', error);
    return {
      error: `An error occurred while updating the guild member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a guild member on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_my_guild_member',
      description: 'Update the current member in the guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          nick: {
            type: 'string',
            nullable: true,
            description: 'The new nickname for the member. Pass null to reset the nickname.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };