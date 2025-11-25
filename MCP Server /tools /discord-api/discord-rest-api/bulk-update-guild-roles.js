/**
 * Function to bulk update the positions of roles in a Discord guild.
 *
 * @param {Object} args - Arguments for the bulk update.
 * @param {string} args.guild_id - The ID of the guild where roles will be updated.
 * @param {Array<Object>} args.roles - An array of role objects to update.
 * @param {string} args.roles[].id - The ID of the role to update.
 * @param {number} args.roles[].position - The new position of the role.
 * @returns {Promise<Object>} - The result of the bulk update operation.
 */
const executeFunction = async ({ guild_id, roles }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/guilds/${guild_id}/roles`;

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
      body: JSON.stringify(roles)
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
    console.error('Error updating guild roles:', error);
    return {
      error: `An error occurred while updating guild roles: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for bulk updating guild roles in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'bulk_update_guild_roles',
      description: 'Bulk update the positions of roles in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where roles will be updated.'
          },
          roles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'The ID of the role to update.'
                },
                position: {
                  type: 'integer',
                  description: 'The new position of the role.'
                }
              },
              required: ['id', 'position']
            },
            description: 'An array of role objects to update.'
          }
        },
        required: ['guild_id', 'roles']
      }
    }
  }
};

export { apiTool };