/**
 * Function to update account settings for the current user on Discord.
 *
 * @param {Object} args - Arguments for updating user settings.
 * @param {string} [args.username] - The new username for the user.
 * @param {string} [args.avatar] - The new avatar for the user (base64 encoded).
 * @returns {Promise<Object>} - The result of the user update operation.
 */
const executeFunction = async ({ username, avatar }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the user update
    const url = `${baseUrl}/users/@me`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Construct the body of the request
    const body = {};
    if (username) body.username = username;
    if (avatar) body.avatar = avatar;

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error updating user settings:', error);
    return {
      error: `An error occurred while updating user settings: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating user settings on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_my_user',
      description: 'Update account settings for the current user on Discord.',
      parameters: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'The new username for the user.'
          },
          avatar: {
            type: 'string',
            description: 'The new avatar for the user (base64 encoded).'
          }
        }
      }
    }
  }
};

export { apiTool };