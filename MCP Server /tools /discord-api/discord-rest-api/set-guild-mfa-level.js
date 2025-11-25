/**
 * Function to set the MFA level for a Discord guild.
 *
 * @param {Object} args - Arguments for setting the MFA level.
 * @param {string} args.guild_id - The ID of the guild to set the MFA level for.
 * @param {Object} args.level - The MFA level to set.
 * @param {string} args.level.title - The title of the MFA level.
 * @param {string} args.level.description - The description of the MFA level.
 * @param {number} args.level.const - The constant value representing the MFA level.
 * @returns {Promise<Object>} - The result of the MFA level setting operation.
 */
const executeFunction = async ({ guild_id, level }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/mfa`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ level });

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
    console.error('Error setting guild MFA level:', error);
    return {
      error: `An error occurred while setting the guild MFA level: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting the MFA level for a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_guild_mfa_level',
      description: 'Set the MFA level for a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to set the MFA level for.'
          },
          level: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'The title of the MFA level.'
              },
              description: {
                type: 'string',
                description: 'The description of the MFA level.'
              },
              const: {
                type: 'integer',
                description: 'The constant value representing the MFA level.'
              }
            },
            required: ['title', 'description', 'const']
          }
        },
        required: ['guild_id', 'level']
      }
    }
  }
};

export { apiTool };