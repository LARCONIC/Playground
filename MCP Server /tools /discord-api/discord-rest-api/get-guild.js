/**
 * Function to retrieve a guild from Discord.
 *
 * @param {Object} args - Arguments for the guild retrieval.
 * @param {string} args.guild_id - The ID of the guild to retrieve.
 * @param {boolean} [args.with_counts=null] - Whether to include approximate member and presence counts.
 * @returns {Promise<Object>} - The result of the guild retrieval.
 */
const executeFunction = async ({ guild_id, with_counts = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}`);
    if (with_counts !== null) {
      url.searchParams.append('with_counts', with_counts);
    }

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving guild:', error);
    return {
      error: `An error occurred while retrieving the guild: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a guild from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_guild',
      description: 'Retrieve a guild from Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to retrieve.'
          },
          with_counts: {
            type: 'boolean',
            description: 'Whether to include approximate member and presence counts.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };