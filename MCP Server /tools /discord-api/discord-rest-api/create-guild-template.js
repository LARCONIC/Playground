/**
 * Function to create a guild template on Discord.
 *
 * @param {Object} args - Arguments for creating the guild template.
 * @param {string} args.guild_id - The ID of the guild where the template will be created.
 * @param {string} args.name - The name of the template.
 * @param {string|null} [args.description=null] - The description of the template.
 * @returns {Promise<Object>} - The result of the guild template creation.
 */
const executeFunction = async ({ guild_id, name, description = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the guild template creation
    const url = `${baseUrl}/guilds/${guild_id}/templates`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ name, description });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error creating guild template:', error);
    return {
      error: `An error occurred while creating the guild template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild template on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_template',
      description: 'Create a guild template for a guild on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the template will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the template.'
          },
          description: {
            type: 'string',
            description: 'The description of the template.'
          }
        },
        required: ['guild_id', 'name']
      }
    }
  }
};

export { apiTool };