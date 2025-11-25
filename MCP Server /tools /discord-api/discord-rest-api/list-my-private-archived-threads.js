/**
 * Function to list the user's joined private archived threads in a specified channel.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel to list archived threads from.
 * @param {string|null} [args.before=null] - The timestamp to get threads before this time.
 * @param {number|null} [args.limit=null] - The maximum number of threads to return.
 * @returns {Promise<Object>} - The result of the request to list archived threads.
 */
const executeFunction = async ({ channel_id, before = null, limit = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user

  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/channels/${channel_id}/users/@me/threads/archived/private`);
    if (before) url.searchParams.append('before', before);
    if (limit) url.searchParams.append('limit', limit.toString());

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
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
    console.error('Error listing private archived threads:', error);
    return {
      error: `An error occurred while listing private archived threads: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing private archived threads on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_my_private_archived_threads',
      description: 'List the user\'s joined private archived threads in a specified channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel to list archived threads from.'
          },
          before: {
            type: 'string',
            nullable: true,
            description: 'The timestamp to get threads before this time.'
          },
          limit: {
            type: 'integer',
            nullable: true,
            description: 'The maximum number of threads to return.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };