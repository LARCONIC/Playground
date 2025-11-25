/**
 * Function to update a guild template on Discord.
 *
 * @param {Object} args - Arguments for updating the guild template.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.code - The code of the template.
 * @param {string} args.name - The new name for the template.
 * @param {string|null} args.description - The new description for the template.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ guild_id, code, name, description }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/guilds/${guild_id}/templates/${code}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Create the body for the PATCH request
    const body = JSON.stringify({ name, description });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error updating guild template:', error);
    return {
      error: `An error occurred while updating the guild template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a guild template on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_template',
      description: 'Update the metadata for a guild template on Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          code: {
            type: 'string',
            description: 'The code of the template.'
          },
          name: {
            type: 'string',
            description: 'The new name for the template.'
          },
          description: {
            type: 'string',
            nullable: true,
            description: 'The new description for the template.'
          }
        },
        required: ['guild_id', 'code', 'name']
      }
    }
  }
};

export { apiTool };