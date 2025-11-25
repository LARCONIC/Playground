/**
 * Function to get a thread member from Discord.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.channel_id - The ID of the channel.
 * @param {string} args.user_id - The ID of the user.
 * @param {boolean|null} [args.with_member=null] - Whether to include the member object.
 * @returns {Promise<Object>} - The response from the Discord API.
 */
const executeFunction = async ({ channel_id, user_id, with_member = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = new URL(`${baseUrl}/channels/${channel_id}/thread-members/${user_id}`);
    if (with_member !== null) {
      url.searchParams.append('with_member', with_member);
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
    console.error('Error getting thread member:', error);
    return {
      error: `An error occurred while getting the thread member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting a thread member from Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_thread_member',
      description: 'Retrieve the thread member object for a user, if they are a member of the thread.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user.'
          },
          with_member: {
            type: 'boolean',
            description: 'Whether to include the member object.'
          }
        },
        required: ['channel_id', 'user_id']
      }
    }
  }
};

export { apiTool };