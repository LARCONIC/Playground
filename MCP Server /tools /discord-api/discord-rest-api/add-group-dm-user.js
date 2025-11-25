/**
 * Function to add a user to a group DM on Discord.
 *
 * @param {Object} args - Arguments for adding a user to a group DM.
 * @param {string} args.channel_id - The ID of the channel.
 * @param {string} args.user_id - The ID of the user to add.
 * @returns {Promise<Object>} - The result of the API call.
 */
const executeFunction = async ({ channel_id, user_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/recipients/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    return await response.json();
  } catch (error) {
    console.error('Error adding user to group DM:', error);
    return {
      error: `An error occurred while adding user to group DM: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for adding a user to a group DM on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_group_dm_user',
      description: 'Add a user to a group DM on Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to add.'
          }
        },
        required: ['channel_id', 'user_id']
      }
    }
  }
};

export { apiTool };