/**
 * Function to create a guild from a template in Discord.
 *
 * @param {Object} args - Arguments for creating the guild.
 * @param {string} args.code - The template code to create the guild from.
 * @param {string} args.name - The name of the new guild.
 * @param {string|null} [args.icon=null] - The icon for the new guild (optional).
 * @returns {Promise<Object>} - The result of the guild creation.
 */
const executeFunction = async ({ code, name, icon = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/guilds/templates/${code}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Create the request body
    const body = JSON.stringify({ name, icon });

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
    console.error('Error creating guild from template:', error);
    return {
      error: `An error occurred while creating the guild: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a guild from a template in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guild_from_template',
      description: 'Create a new guild based on a guild template.',
      parameters: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'The template code to create the guild from.'
          },
          name: {
            type: 'string',
            description: 'The name of the new guild.'
          },
          icon: {
            type: 'string',
            description: 'The icon for the new guild (optional).'
          }
        },
        required: ['code', 'name']
      }
    }
  }
};

export { apiTool };