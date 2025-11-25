/**
 * Function to create a message in a Discord channel.
 *
 * @param {Object} args - Arguments for creating a message.
 * @param {string} args.channel_id - The ID of the channel where the message will be sent.
 * @param {string} args.content - The content of the message.
 * @param {Array} [args.embeds] - An array of embed objects to include in the message.
 * @param {Array} [args.allowed_mentions] - An array of allowed mentions.
 * @param {Array} [args.sticker_ids] - An array of sticker IDs to include in the message.
 * @param {Array} [args.components] - An array of components to include in the message.
 * @param {number} [args.flags] - Message flags.
 * @param {Array} [args.attachments] - An array of attachments to include in the message.
 * @param {string} [args.message_reference] - A message reference object.
 * @param {string} [args.nonce] - A nonce to ensure the message is unique.
 * @param {boolean} [args.tts] - Whether the message is a TTS message.
 * @returns {Promise<Object>} - The result of the message creation.
 */
const executeFunction = async ({ channel_id, content, embeds = [], allowed_mentions = null, sticker_ids = [], components = [], flags = null, attachments = [], message_reference = null, nonce = null, tts = null }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/channels/${channel_id}/messages`;

    // Prepare the form data
    const formData = new URLSearchParams();
    formData.append('content', content);
    if (embeds.length) formData.append('embeds', JSON.stringify(embeds));
    if (allowed_mentions) formData.append('allowed_mentions', JSON.stringify(allowed_mentions));
    if (sticker_ids.length) formData.append('sticker_ids', JSON.stringify(sticker_ids));
    if (components.length) formData.append('components', JSON.stringify(components));
    if (flags !== null) formData.append('flags', flags);
    if (attachments.length) formData.append('attachments', JSON.stringify(attachments));
    if (message_reference) formData.append('message_reference', JSON.stringify(message_reference));
    if (nonce) formData.append('nonce', nonce);
    if (tts !== null) formData.append('tts', tts);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
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
    console.error('Error creating message:', error);
    return {
      error: `An error occurred while creating the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a message in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_message',
      description: 'Create a message in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message will be sent.'
          },
          content: {
            type: 'string',
            description: 'The content of the message.'
          },
          embeds: {
            type: 'array',
            description: 'An array of embed objects to include in the message.'
          },
          allowed_mentions: {
            type: 'array',
            description: 'An array of allowed mentions.'
          },
          sticker_ids: {
            type: 'array',
            description: 'An array of sticker IDs to include in the message.'
          },
          components: {
            type: 'array',
            description: 'An array of components to include in the message.'
          },
          flags: {
            type: 'integer',
            description: 'Message flags.'
          },
          attachments: {
            type: 'array',
            description: 'An array of attachments to include in the message.'
          },
          message_reference: {
            type: 'string',
            description: 'A message reference object.'
          },
          nonce: {
            type: 'string',
            description: 'A nonce to ensure the message is unique.'
          },
          tts: {
            type: 'boolean',
            description: 'Whether the message is a TTS message.'
          }
        },
        required: ['channel_id', 'content']
      }
    }
  }
};

export { apiTool };