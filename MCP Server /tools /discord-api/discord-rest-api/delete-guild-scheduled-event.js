/**
 * Function to delete a scheduled event in a Discord guild.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.guild_id - The ID of the guild where the event is scheduled.
 * @param {string} args.guild_scheduled_event_id - The ID of the scheduled event to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ guild_id, guild_scheduled_event_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the scheduled event deletion
    const url = `${baseUrl}/guilds/${guild_id}/scheduled-events/${guild_scheduled_event_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bot ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return a success message for deletion
    return { message: 'Scheduled event deleted successfully.' };
  } catch (error) {
    console.error('Error deleting scheduled event:', error);
    return {
      error: `An error occurred while deleting the scheduled event: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a scheduled event in a Discord guild.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guild_scheduled_event',
      description: 'Delete a scheduled event in the guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild where the event is scheduled.'
          },
          guild_scheduled_event_id: {
            type: 'string',
            description: 'The ID of the scheduled event to delete.'
          }
        },
        required: ['guild_id', 'guild_scheduled_event_id']
      }
    }
  }
};

export { apiTool };