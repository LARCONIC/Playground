/**
 * Function to add a user to a guild in Discord.
 *
 * @param {Object} args - Arguments for adding a guild member.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.user_id - The ID of the user to add.
 * @param {string} args.access_token - The access token for the user.
 * @param {string|null} [args.nick] - The nickname for the user in the guild.
 * @param {Array<string|null>} [args.roles] - The roles to assign to the user.
 * @param {boolean|null} [args.mute] - Whether the user is muted.
 * @param {boolean|null} [args.deaf] - Whether the user is deafened.
 * @param {number|null} [args.flags] - The flags for the user.
 * @returns {Promise<Object>} - The result of the add guild member operation.
 */
const executeFunction = async ({ guild_id, user_id, access_token, nick = null, roles = [], mute = null, deaf = null, flags = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/guilds/${guild_id}/members/${user_id}`;
  
  const body = JSON.stringify({
    access_token,
    nick,
    roles,
    mute,
    deaf,
    flags
  });

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding guild member:', error);
    return {
      error: `An error occurred while adding the guild member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for adding a guild member in Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_guild_member',
      description: 'Add a user to a guild in Discord.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to add.'
          },
          access_token: {
            type: 'string',
            description: 'The access token for the user.'
          },
          nick: {
            type: 'string',
            description: 'The nickname for the user in the guild.'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The roles to assign to the user.'
          },
          mute: {
            type: 'boolean',
            description: 'Whether the user is muted.'
          },
          deaf: {
            type: 'boolean',
            description: 'Whether the user is deafened.'
          },
          flags: {
            type: 'integer',
            description: 'The flags for the user.'
          }
        },
        required: ['guild_id', 'user_id', 'access_token']
      }
    }
  }
};

export { apiTool };