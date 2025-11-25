/**
 * Function to create a new role in a Discord guild.
 *
 * @param {Object} args - Arguments for creating a guild role.
 * @param {string} args.guild_id - The ID of the guild where the role will be created.
 * @param {string} args.name - The name of the role.
 * @param {string} [args.color] - The color of the role in hexadecimal format.
 * @param {boolean} [args.hoist] - Whether the role should be displayed separately in the sidebar.
 * @param {string} [args.permissions] - The permissions for the role.
 * @param {string} [args.description] - The description of the role.
 * @returns {Promise<Object>} - The result of the role creation.
 */
const executeFunction = async ({ guild_id, name, color, hoist, permissions, description }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/roles`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Create the body for the request
    const body = {
      name,
      color,
      hoist,
      permissions,
      description
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error creating guild role:', error);
    return {
      error: `An error occurred while creating the guild role: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild role in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_role',
      description: 'Create a new role in a Discord guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the role will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the role.'
          },
          color: {
            type: 'string',
            description: 'The color of the role in hexadecimal format.'
          },
          hoist: {
            type: 'boolean',
            description: 'Whether the role should be displayed separately in the sidebar.'
          },
          permissions: {
            type: 'string',
            description: 'The permissions for the role.'
          },
          description: {
            type: 'string',
            description: 'The description of the role.'
          }
        },
        required: ['guild_id', 'name']
      }
    }
  }
};

export { apiTool };