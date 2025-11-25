/**
 * Function to resolve a Discord invite.
 *
 * @param {Object} args - Arguments for the invite resolution.
 * @param {string} args.code - The invite code to resolve.
 * @param {boolean} [args.with_counts=null] - Whether to include invite usage counts.
 * @param {string} [args.guild_scheduled_event_id=null] - The ID of a scheduled event to associate with the invite.
 * @returns {Promise<Object>} - The result of the invite resolution.
 */
const executeFunction = async ({ code, with_counts = null, guild_scheduled_event_id = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/invites/${code}`);
    if (with_counts !== null) url.searchParams.append('with_counts', with_counts);
    if (guild_scheduled_event_id !== null) url.searchParams.append('guild_scheduled_event_id', guild_scheduled_event_id);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error resolving invite:', error);
    return {
      error: `An error occurred while resolving the invite: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for resolving Discord invites.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'invite_resolve',
      description: 'Resolve a Discord invite.',
      parameters: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'The invite code to resolve.'
          },
          with_counts: {
            type: 'boolean',
            description: 'Whether to include invite usage counts.'
          },
          guild_scheduled_event_id: {
            type: 'string',
            description: 'The ID of a scheduled event to associate with the invite.'
          }
        },
        required: ['code']
      }
    }
  }
};

export { apiTool };