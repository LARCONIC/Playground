/**
 * Function to list members of a guild in Discord.
 *
 * @param {Object} args - Arguments for the member listing.
 * @param {string} args.guild_id - The ID of the guild (server) to list members from.
 * @param {number} [args.limit] - The maximum number of members to return.
 * @param {number} [args.after] - The ID of the member after which to return members.
 * @returns {Promise<Object>} - The result of the member listing.
 */
const executeFunction = async ({ guild_id, limit, after }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/guilds/${guild_id}/members`);
    if (limit !== undefined) url.searchParams.append('limit', limit);
    if (after !== undefined) url.searchParams.append('after', after);

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
    console.error('Error listing guild members:', error);
    return {
      error: `An error occurred while listing guild members: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing guild members in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guild_members',
      description: 'List members of a guild in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild (server) to list members from.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of members to return.'
          },
          after: {
            type: 'integer',
            description: 'The ID of the member after which to return members.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };