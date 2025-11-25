/**
 * Function to preview the number of members that would be removed from a guild if it was pruned.
 *
 * @param {Object} args - Arguments for the prune preview.
 * @param {string} args.guild_id - The ID of the guild to preview the prune for.
 * @returns {Promise<Object>} - The result of the prune preview, containing the number of members that would be pruned.
 */
const executeFunction = async ({ guild_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with the guild ID
    const url = `${baseUrl}/guilds/${guild_id}/prune`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
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
    console.error('Error previewing prune guild:', error);
    return {
      error: `An error occurred while previewing the prune: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for previewing prune guild on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'preview_prune_guild',
      description: 'Preview the number of members that would be removed from a guild if it was pruned.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild to preview the prune for.'
          }
        },
        required: ['guild_id']
      }
    }
  }
};

export { apiTool };