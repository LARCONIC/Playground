/**
 * Function to update application role connections metadata on Discord.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.application_id - The ID of the application to update.
 * @param {Array<Object>} args.metadata - The metadata to update for the role connections.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ application_id, metadata }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the application ID
    const url = `${baseUrl}/applications/${application_id}/role-connections/metadata`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(metadata)
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
    console.error('Error updating application role connections metadata:', error);
    return {
      error: `An error occurred while updating application role connections metadata: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating application role connections metadata on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_application_role_connections_metadata',
      description: 'Update application role connections metadata for the app.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application to update.'
          },
          metadata: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    const: { type: 'integer' }
                  },
                  required: ['title', 'description', 'const']
                },
                key: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                name_localizations: { type: 'object' },
                description_localizations: { type: 'object' }
              },
              required: ['type', 'key', 'name', 'description']
            },
            description: 'The metadata to update for the role connections.'
          }
        },
        required: ['application_id', 'metadata']
      }
    }
  }
};

export { apiTool };