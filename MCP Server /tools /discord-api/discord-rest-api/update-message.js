/**
 * Function to update a message in a Discord channel.
 *
 * @param {Object} args - Arguments for updating the message.
 * @param {string} args.channel_id - The ID of the channel where the message is located.
 * @param {string} args.message_id - The ID of the message to be updated.
 * @param {string} [args.content] - The new content of the message.
 * @param {Array} [args.embeds] - An array of embed objects to include in the message.
 * @param {number} [args.flags] - The flags to apply to the message.
 * @param {Array} [args.allowed_mentions] - An array of allowed mentions.
 * @param {Array} [args.sticker_ids] - An array of sticker IDs to include in the message.
 * @param {Array} [args.components] - An array of components to include in the message.
 * @param {Array} [args.attachments] - An array of attachments to include in the message.
 * @returns {Promise<Object>} - The result of the message update.
 */
const executeFunction = async ({ channel_id, message_id, content, embeds, flags, allowed_mentions, sticker_ids, components, attachments }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user

  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/channels/${channel_id}/messages/${message_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Prepare the body data
    const bodyData = new URLSearchParams();
    if (content) bodyData.append('content', content);
    if (embeds) bodyData.append('embeds', JSON.stringify(embeds));
    if (flags) bodyData.append('flags', flags);
    if (allowed_mentions) bodyData.append('allowed_mentions', JSON.stringify(allowed_mentions));
    if (sticker_ids) bodyData.append('sticker_ids', JSON.stringify(sticker_ids));
    if (components) bodyData.append('components', JSON.stringify(components));
    if (attachments) bodyData.append('attachments', JSON.stringify(attachments));

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: bodyData
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
    console.error('Error updating message:', error);
    return {
      error: `An error occurred while updating the message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a message in a Discord channel.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_message',
      description: 'Update a message in a Discord channel.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the message is located.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to be updated.'
          },
          content: {
            type: 'string',
            description: 'The new content of the message.'
          },
          embeds: {
            type: 'array',
            description: 'An array of embed objects to include in the message.'
          },
          flags: {
            type: 'integer',
            description: 'The flags to apply to the message.'
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
          attachments: {
            type: 'array',
            description: 'An array of attachments to include in the message.'
          }
        },
        required: ['channel_id', 'message_id']
      }
    }
  }
};

export { apiTool };