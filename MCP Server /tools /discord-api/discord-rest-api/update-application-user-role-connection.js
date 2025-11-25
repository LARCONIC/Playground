/**
 * Function to update an application's user role connection metadata on Discord.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.application_id - The ID of the application to update.
 * @param {string} [args.platform_name] - The name of the platform (optional).
 * @param {string} [args.platform_username] - The username on the platform (optional).
 * @param {Object} [args.metadata] - Metadata object containing additional information.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ application_id, platform_name = null, platform_username = null, metadata = {} }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  const url = `${baseUrl}/users/@me/applications/${application_id}/role-connection`;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bot ${botToken}`
  };

  const body = JSON.stringify({
    platform_name,
    platform_username,
    metadata
  });

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating application user role connection:', error);
    return {
      error: `An error occurred while updating the application user role connection: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating application user role connection on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_application_user_role_connection',
      description: 'Update an app\'s role connection metadata for the user.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application to update.'
          },
          platform_name: {
            type: 'string',
            description: 'The name of the platform (optional).'
          },
          platform_username: {
            type: 'string',
            description: 'The username on the platform (optional).'
          },
          metadata: {
            type: 'object',
            description: 'Metadata object containing additional information.'
          }
        },
        required: ['application_id']
      }
    }
  }
};

export { apiTool };