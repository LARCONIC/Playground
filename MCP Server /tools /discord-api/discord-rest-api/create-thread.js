/**
 * Function to create a new thread in a Discord channel.
 *
 * @param {Object} args - Arguments for creating the thread.
 * @param {string} args.channel_id - The ID of the channel where the thread will be created.
 * @param {string} args.name - The name of the thread.
 * @param {string|null} [args.content=null] - The content of the thread.
 * @param {Array} [args.embeds=[]] - An array of embed objects to include in the thread.
 * @param {Object|null} [args.allowed_mentions=null] - Allowed mentions for the thread.
 * @param {Array} [args.sticker_ids=[]] - An array of sticker IDs to include in the thread.
 * @param {Array} [args.components=[]] - An array of components to include in the thread.
 * @param {number|null} [args.flags=null] - Flags for the thread.
 * @param {Array} [args.attachments=[]] - An array of attachments to include in the thread.
 * @param {number|null} [args.auto_archive_duration=null] - Duration for auto-archiving the thread.
 * @param {number|null} [args.rate_limit_per_user=null] - Rate limit per user for the thread.
 * @param {Array} [args.applied_tags=[]] - An array of tags to apply to the thread.
 * @returns {Promise<Object>} - The result of the thread creation.
 */
const executeFunction = async ({ channel_id, name, content = null, embeds = [], allowed_mentions = null, sticker_ids = [], components = [], flags = null, attachments = [], auto_archive_duration = null, rate_limit_per_user = null, applied_tags = [] }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  const url = `${baseUrl}/channels/${channel_id}/threads`;

  const body = new URLSearchParams();
  body.append('name', name);
  if (content !== null) body.append('content', content);
  if (embeds.length > 0) body.append('embeds', JSON.stringify(embeds));
  if (allowed_mentions !== null) body.append('allowed_mentions', JSON.stringify(allowed_mentions));
  if (sticker_ids.length > 0) body.append('sticker_ids', JSON.stringify(sticker_ids));
  if (components.length > 0) body.append('components', JSON.stringify(components));
  if (flags !== null) body.append('flags', flags);
  if (attachments.length > 0) body.append('attachments', JSON.stringify(attachments));
  if (auto_archive_duration !== null) body.append('auto_archive_duration', auto_archive_duration);
  if (rate_limit_per_user !== null) body.append('rate_limit_per_user', rate_limit_per_user);
  if (applied_tags.length > 0) body.append('applied_tags', JSON.stringify(applied_tags));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Bot ${botToken}`
      },
      body: body.toString()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating thread:', error);
    return {
      error: `An error occurred while creating the thread: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a thread in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_thread',
      description: 'Create a new thread in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the thread will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the thread.'
          },
          content: {
            type: 'string',
            description: 'The content of the thread.'
          },
          embeds: {
            type: 'array',
            description: 'An array of embed objects to include in the thread.'
          },
          allowed_mentions: {
            type: 'object',
            description: 'Allowed mentions for the thread.'
          },
          sticker_ids: {
            type: 'array',
            description: 'An array of sticker IDs to include in the thread.'
          },
          components: {
            type: 'array',
            description: 'An array of components to include in the thread.'
          },
          flags: {
            type: 'integer',
            description: 'Flags for the thread.'
          },
          attachments: {
            type: 'array',
            description: 'An array of attachments to include in the thread.'
          },
          auto_archive_duration: {
            type: 'integer',
            description: 'Duration for auto-archiving the thread.'
          },
          rate_limit_per_user: {
            type: 'integer',
            description: 'Rate limit per user for the thread.'
          },
          applied_tags: {
            type: 'array',
            description: 'An array of tags to apply to the thread.'
          }
        },
        required: ['channel_id', 'name']
      }
    }
  }
};

export { apiTool };