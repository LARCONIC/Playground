/**
 * Function to update a webhook message on Discord.
 *
 * @param {Object} args - Arguments for updating the webhook message.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} args.message_id - The ID of the message to update.
 * @param {string} [args.content] - The new content for the message.
 * @param {Array} [args.embeds] - An array of embed objects to include in the message.
 * @param {Array} [args.allowed_mentions] - An array of allowed mentions.
 * @param {Array} [args.components] - An array of components to include in the message.
 * @param {Array} [args.attachments] - An array of attachments to include in the message.
 * @param {number} [args.flags] - Flags for the message.
 * @param {string} [args.thread_id] - The ID of the thread to send the message in.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ webhook_id, webhook_token, message_id, content, embeds, allowed_mentions, components, attachments, flags, thread_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/webhooks/${webhook_id}/${webhook_token}/messages/${message_id}` + (thread_id ? `?thread_id=${thread_id}` : '');

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the body of the request
    const body = new URLSearchParams();
    if (content) body.append('content', content);
    if (embeds) body.append('embeds', JSON.stringify(embeds));
    if (allowed_mentions) body.append('allowed_mentions', JSON.stringify(allowed_mentions));
    if (components) components.forEach(component => body.append('components', JSON.stringify(component)));
    if (attachments) attachments.forEach(attachment => body.append('attachments', JSON.stringify(attachment)));
    if (flags) body.append('flags', flags.toString());

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
    console.error('Error updating webhook message:', error);
    return {
      error: `An error occurred while updating the webhook message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a webhook message on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_webhook_message',
      description: 'Update a previously sent webhook message on Discord.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook.'
          },
          webhook_token: {
            type: 'string',
            description: 'The token of the webhook.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the message to update.'
          },
          content: {
            type: 'string',
            description: 'The new content for the message.'
          },
          embeds: {
            type: 'array',
            description: 'An array of embed objects to include in the message.'
          },
          allowed_mentions: {
            type: 'array',
            description: 'An array of allowed mentions.'
          },
          components: {
            type: 'array',
            description: 'An array of components to include in the message.'
          },
          attachments: {
            type: 'array',
            description: 'An array of attachments to include in the message.'
          },
          flags: {
            type: 'integer',
            description: 'Flags for the message.'
          },
          thread_id: {
            type: 'string',
            description: 'The ID of the thread to send the message in.'
          }
        },
        required: ['webhook_id', 'webhook_token', 'message_id']
      }
    }
  }
};

export { apiTool };