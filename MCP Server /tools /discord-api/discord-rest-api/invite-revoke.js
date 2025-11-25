/**
 * Function to revoke an invite on Discord.
 *
 * @param {Object} args - Arguments for the revoke invite operation.
 * @param {string} args.code - The invite code to revoke.
 * @returns {Promise<Object>} - The result of the revoke invite operation.
 */
const executeFunction = async ({ code }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the invite code
    const url = `${baseUrl}/invites/${code}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error revoking invite:', error);
    return {
      error: `An error occurred while revoking the invite: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for revoking an invite on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'invite_revoke',
      description: 'Revoke an invite on Discord.',
      parameters: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'The invite code to revoke.'
          }
        },
        required: ['code']
      }
    }
  }
};

export { apiTool };