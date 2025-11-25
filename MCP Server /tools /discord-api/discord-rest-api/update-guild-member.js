/**
 * Function to update member properties for a user in a guild on Discord.
 *
 * @param {Object} args - Arguments for updating the guild member.
 * @param {string} args.guild_id - The ID of the guild.
 * @param {string} args.user_id - The ID of the user to update.
 * @param {Object} [args.memberData] - The member data to update.
 * @param {string|null} [args.memberData.nick] - The nickname of the member.
 * @param {Array<string>|null} [args.memberData.roles] - The roles to assign to the member.
 * @param {boolean|null} [args.memberData.mute] - Whether the member is muted.
 * @param {boolean|null} [args.memberData.deaf] - Whether the member is deafened.
 * @param {string|null} [args.memberData.channel_id] - The ID of the channel the member is connected to.
 * @param {string|null} [args.memberData.communication_disabled_until] - The time until communication is disabled for the member.
 * @param {number|null} [args.memberData.flags] - The flags for the member.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ guild_id, user_id, memberData }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL
    const url = `${baseUrl}/guilds/${guild_id}/members/${user_id}`;

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
      body: JSON.stringify(memberData)
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
    console.error('Error updating guild member:', error);
    return {
      error: `An error occurred while updating the guild member: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a guild member on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guild_member',
      description: 'Update member properties for a user in a guild.',
      parameters: {
        type: 'object',
        properties: {
          guild_id: {
            type: 'string',
            description: 'The ID of the guild.'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user to update.'
          },
          memberData: {
            type: 'object',
            properties: {
              nick: {
                type: 'string',
                description: 'The nickname of the member.'
              },
              roles: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'The roles to assign to the member.'
              },
              mute: {
                type: 'boolean',
                description: 'Whether the member is muted.'
              },
              deaf: {
                type: 'boolean',
                description: 'Whether the member is deafened.'
              },
              channel_id: {
                type: 'string',
                description: 'The ID of the channel the member is connected to.'
              },
              communication_disabled_until: {
                type: 'string',
                format: 'date-time',
                description: 'The time until communication is disabled for the member.'
              },
              flags: {
                type: 'integer',
                description: 'The flags for the member.'
              }
            }
          }
        },
        required: ['guild_id', 'user_id']
      }
    }
  }
};

export { apiTool };