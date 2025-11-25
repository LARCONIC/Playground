/**
 * Function to set channel permission overwrite in Discord.
 *
 * @param {Object} args - Arguments for setting the permission overwrite.
 * @param {string} args.channel_id - The ID of the channel where the permission overwrite is to be set.
 * @param {string} args.overwrite_id - The ID of the permission overwrite to modify.
 * @param {string} [args.type=null] - The type of overwrite (e.g., role or member).
 * @param {number|null} [args.allow=null] - The permissions to allow.
 * @param {number|null} [args.deny=null] - The permissions to deny.
 * @returns {Promise<Object>} - The result of the permission overwrite operation.
 */
const executeFunction = async ({ channel_id, overwrite_id, type = null, allow = null, deny = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/permissions/${overwrite_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the body for the request
    const body = JSON.stringify({
      type,
      allow,
      deny
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    return await response.json();
  } catch (error) {
    console.error('Error setting channel permission overwrite:', error);
    return {
      error: `An error occurred while setting channel permission overwrite: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting channel permission overwrite in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_channel_permission_overwrite',
      description: 'Set permission overwrite for a user or role in a channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the permission overwrite is to be set.'
          },
          overwrite_id: {
            type: 'string',
            description: 'The ID of the permission overwrite to modify.'
          },
          type: {
            type: 'string',
            description: 'The type of overwrite (e.g., role or member).'
          },
          allow: {
            type: 'integer',
            description: 'The permissions to allow.'
          },
          deny: {
            type: 'integer',
            description: 'The permissions to deny.'
          }
        },
        required: ['channel_id', 'overwrite_id']
      }
    }
  }
};

export { apiTool };