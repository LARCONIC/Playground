/**
 * Function to list public archived threads in a Discord channel.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel to list archived threads from.
 * @param {string} [args.before] - Get threads before this timestamp.
 * @param {number} [args.limit] - The maximum number of threads to return.
 * @returns {Promise<Object>} - The result of the request to list archived threads.
 */
const executeFunction = async ({ channel_id, before, limit }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/channels/${channel_id}/threads/archived/public`);
    if (before) url.searchParams.append('before', before);
    if (limit) url.searchParams.append('limit', limit.toString());

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
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
    console.error('Error listing public archived threads:', error);
    return {
      error: `An error occurred while listing public archived threads: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing public archived threads in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_public_archived_threads',
      description: 'List public archived threads in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to list archived threads from.'
          },
          before: {
            type: 'string',
            description: 'Get threads before this timestamp.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of threads to return.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };