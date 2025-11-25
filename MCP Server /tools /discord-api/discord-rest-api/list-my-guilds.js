/**
 * Function to list guilds where the user is a member.
 *
 * @param {Object} args - Arguments for the guild listing.
 * @param {string} [args.before] - Guilds before this ID.
 * @param {string} [args.after] - Guilds after this ID.
 * @param {number} [args.limit] - The maximum number of guilds to return.
 * @param {boolean} [args.with_counts] - Whether to include approximate member counts.
 * @returns {Promise<Object>} - The result of the guild listing.
 */
const executeFunction = async ({ before, after, limit, with_counts }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/users/@me/guilds`);
    if (before) url.searchParams.append('before', before);
    if (after) url.searchParams.append('after', after);
    if (limit) url.searchParams.append('limit', limit.toString());
    if (with_counts !== undefined) url.searchParams.append('with_counts', with_counts.toString());

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
    console.error('Error listing guilds:', error);
    return {
      error: `An error occurred while listing guilds: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing guilds on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_my_guilds',
      description: 'List guilds where the user is a member.',
      parameters: {
        type: 'object',
        properties: {
          before: {
            type: 'string',
            description: 'Guilds before this ID.'
          },
          after: {
            type: 'string',
            description: 'Guilds after this ID.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of guilds to return.'
          },
          with_counts: {
            type: 'boolean',
            description: 'Whether to include approximate member counts.'
          }
        }
      }
    }
  }
};

export { apiTool };