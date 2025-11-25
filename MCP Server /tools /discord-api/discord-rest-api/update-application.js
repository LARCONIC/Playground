/**
 * Function to update a Discord application.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.application_id - The ID of the application to update.
 * @param {Object} [args.data] - The data to update the application with.
 * @param {string} [args.data.description] - The new description of the application.
 * @param {string} [args.data.icon] - The new icon of the application.
 * @param {string} [args.data.cover_image] - The new cover image of the application.
 * @param {string} [args.data.team_id] - The team ID associated with the application.
 * @param {number} [args.data.flags] - The flags for the application.
 * @param {string} [args.data.interactions_endpoint_url] - The interactions endpoint URL.
 * @param {number} [args.data.max_participants] - The maximum number of participants.
 * @param {string} [args.data.type] - The type of the application.
 * @param {Array<string>} [args.data.tags] - Tags associated with the application.
 * @param {string} [args.data.custom_install_url] - The custom install URL.
 * @param {string} [args.data.install_params] - Installation parameters.
 * @param {string} [args.data.role_connections_verification_url] - Role connections verification URL.
 * @returns {Promise<Object>} - The result of the application update.
 */
const executeFunction = async ({ application_id, data }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/applications/${application_id}`;
  
  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating application:', error);
    return {
      error: `An error occurred while updating the application: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a Discord application.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_application',
      description: 'Update a Discord application.',
      parameters: {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
            description: 'The ID of the application to update.'
          },
          data: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
                description: 'The new description of the application.'
              },
              icon: {
                type: 'string',
                description: 'The new icon of the application.'
              },
              cover_image: {
                type: 'string',
                description: 'The new cover image of the application.'
              },
              team_id: {
                type: 'string',
                description: 'The team ID associated with the application.'
              },
              flags: {
                type: 'integer',
                description: 'The flags for the application.'
              },
              interactions_endpoint_url: {
                type: 'string',
                description: 'The interactions endpoint URL.'
              },
              max_participants: {
                type: 'integer',
                description: 'The maximum number of participants.'
              },
              type: {
                type: 'string',
                description: 'The type of the application.'
              },
              tags: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'Tags associated with the application.'
              },
              custom_install_url: {
                type: 'string',
                description: 'The custom install URL.'
              },
              install_params: {
                type: 'string',
                description: 'Installation parameters.'
              },
              role_connections_verification_url: {
                type: 'string',
                description: 'Role connections verification URL.'
              }
            }
          }
        },
        required: ['application_id']
      }
    }
  }
};

export { apiTool };