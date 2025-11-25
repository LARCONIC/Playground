/**
 * Function to list all members of a thread in Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel where the thread is located.
 * @param {boolean} [args.with_member] - Whether to include member data.
 * @param {number} [args.limit] - The maximum number of members to return.
 * @param {string} [args.after] - The ID of the member after which to return members.
 * @returns {Promise<Object>} - The result of the thread members listing.
 */
const executeFunction = async ({ channel_id, with_member = null, limit = null, after = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/channels/${channel_id}/thread-members`);
    if (with_member !== null) url.searchParams.append('with_member', with_member);
    if (limit !== null) url.searchParams.append('limit', limit);
    if (after !== null) url.searchParams.append('after', after);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${botToken}`,
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
    console.error('Error listing thread members:', error);
    return {
      error: `An error occurred while listing thread members: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing thread members in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_thread_members',
      description: 'List all members of a thread in Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the thread is located.'
          },
          with_member: {
            type: 'boolean',
            description: 'Whether to include member data.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of members to return.'
          },
          after: {
            type: 'string',
            description: 'The ID of the member after which to return members.'
          }
        },
        required: ['channel_id']
      }
    }
  }
};

export { apiTool };