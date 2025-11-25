/**
 * Function to search for guild members in Discord.
 *
 * @param {Object} args - Arguments for the search.
 * @param {string} args.guild_id - The ID of the guild to search members in.
 * @param {string} args.query - The query string to search for members by username or nickname.
 * @param {number} args.limit - The maximum number of members to return.
 * @returns {Promise<Object>} - The result of the guild members search.
 */
const executeFunction = async ({ guild_id, query, limit }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}/members/search`);
    url.searchParams.append('query', query);
    url.searchParams.append('limit', limit.toString());

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
    console.error('Error searching for guild members:', error);
    return {
      error: `An error occurred while searching for guild members: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for searching guild members in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_guild_members',
      description: 'Search for guild members in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to search members in.'
          },
          query: {
            type: 'string',
            description: 'The query string to search for members by username or nickname.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of members to return.'
          }
        },
        required: ['guild_id', 'query', 'limit']
      }
    }
  }
};

export { apiTool };