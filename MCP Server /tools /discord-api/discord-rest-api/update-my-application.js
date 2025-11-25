/**
 * Function to update the application associated with the requesting bot user on Discord.
 *
 * @param {Object} args - Arguments for updating the application.
 * @param {string|null} [args.description=null] - The new description for the application.
 * @param {string|null} [args.icon=null] - The new icon for the application.
 * @param {string|null} [args.cover_image=null] - The new cover image for the application.
 * @param {string|null} [args.team_id=null] - The team ID associated with the application.
 * @param {number|null} [args.flags=null] - The flags for the application.
 * @param {string|null} [args.interactions_endpoint_url=null] - The interactions endpoint URL.
 * @param {number|null} [args.max_participants=null] - The maximum number of participants.
 * @param {string|null} [args.type=null] - The type of the application.
 * @param {Array<string>} [args.tags=[]] - The tags associated with the application.
 * @param {string|null} [args.custom_install_url=null] - The custom install URL for the application.
 * @param {string|null} [args.install_params=null] - The install parameters.
 * @param {string|null} [args.role_connections_verification_url=null] - The role connections verification URL.
 * @returns {Promise<Object>} - The result of the application update.
 */
const executeFunction = async (args) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  const url = `${baseUrl}/applications/@me`;
  
  const payload = {
    description: args.description || null,
    icon: args.icon || null,
    cover_image: args.cover_image || null,
    team_id: args.team_id || null,
    flags: args.flags || null,
    interactions_endpoint_url: args.interactions_endpoint_url || null,
    max_participants: args.max_participants || null,
    type: args.type || null,
    tags: args.tags || [],
    custom_install_url: args.custom_install_url || null,
    install_params: args.install_params || null,
    role_connections_verification_url: args.role_connections_verification_url || null
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bot ${botToken}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating application:', error);
    return {
      error: `An error occurred while updating the application: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating the application on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_my_application',
      description: 'Update the app associated with the requesting bot user.',
      parameters: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            nullable: true,
            description: 'The new description for the application.'
          },
          icon: {
            type: 'string',
            nullable: true,
            description: 'The new icon for the application.'
          },
          cover_image: {
            type: 'string',
            nullable: true,
            description: 'The new cover image for the application.'
          },
          team_id: {
            type: 'string',
            nullable: true,
            description: 'The team ID associated with the application.'
          },
          flags: {
            type: 'integer',
            nullable: true,
            description: 'The flags for the application.'
          },
          interactions_endpoint_url: {
            type: 'string',
            nullable: true,
            description: 'The interactions endpoint URL.'
          },
          max_participants: {
            type: 'integer',
            nullable: true,
            description: 'The maximum number of participants.'
          },
          type: {
            type: 'string',
            nullable: true,
            description: 'The type of the application.'
          },
          tags: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The tags associated with the application.'
          },
          custom_install_url: {
            type: 'string',
            nullable: true,
            description: 'The custom install URL for the application.'
          },
          install_params: {
            type: 'string',
            nullable: true,
            description: 'The install parameters.'
          },
          role_connections_verification_url: {
            type: 'string',
            nullable: true,
            description: 'The role connections verification URL.'
          }
        }
      }
    }
  }
};

export { apiTool };