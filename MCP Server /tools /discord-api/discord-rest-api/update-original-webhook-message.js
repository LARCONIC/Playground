/**
 * Function to update the original webhook message on Discord.
 *
 * @param {Object} args - Arguments for updating the webhook message.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} [args.content] - The content of the message.
 * @param {Array} [args.embeds] - An array of embed objects.
 * @param {Array} [args.allowed_mentions] - An array of allowed mention objects.
 * @param {Array} [args.components] - An array of component objects.
 * @param {Array} [args.attachments] - An array of attachment objects.
 * @param {number} [args.flags] - Message flags.
 * @param {string} [args.thread_id] - The ID of the thread to send the message in.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ webhook_id, webhook_token, content, embeds, allowed_mentions, components, attachments, flags, thread_id }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;

  try {
    // Construct the URL with path variables
    const url = new URL(`${baseUrl}/webhooks/${webhook_id}/${webhook_token}/messages/@original`);
    if (thread_id) {
      url.searchParams.append('thread_id', thread_id);
    }

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bot ${token}`
    };

    // Prepare the body data
    const bodyData = new URLSearchParams();
    if (content) bodyData.append('content', content);
    if (embeds) bodyData.append('embeds', JSON.stringify(embeds));
    if (allowed_mentions) bodyData.append('allowed_mentions', JSON.stringify(allowed_mentions));
    if (components) components.forEach(component => bodyData.append('components', JSON.stringify(component)));
    if (attachments) attachments.forEach(attachment => bodyData.append('attachments', JSON.stringify(attachment)));
    if (flags) bodyData.append('flags', flags.toString());

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error updating webhook message:', error);
    return {
      error: `An error occurred while updating the webhook message: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating the original webhook message on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_original_webhook_message',
      description: 'Update the original webhook message on Discord.',
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
          content: {
            type: 'string',
            description: 'The content of the message.'
          },
          embeds: {
            type: 'array',
            description: 'An array of embed objects.'
          },
          allowed_mentions: {
            type: 'array',
            description: 'An array of allowed mention objects.'
          },
          components: {
            type: 'array',
            description: 'An array of component objects.'
          },
          attachments: {
            type: 'array',
            description: 'An array of attachment objects.'
          },
          flags: {
            type: 'integer',
            description: 'Message flags.'
          },
          thread_id: {
            type: 'string',
            description: 'The ID of the thread to send the message in.'
          }
        },
        required: ['webhook_id', 'webhook_token']
      }
    }
  }
};

export { apiTool };