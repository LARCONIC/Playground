/**
 * Function to execute a webhook on Discord.
 *
 * @param {Object} args - Arguments for the webhook execution.
 * @param {string} args.webhook_id - The ID of the webhook.
 * @param {string} args.webhook_token - The token of the webhook.
 * @param {string} [args.content] - The content to send in the webhook.
 * @param {Array} [args.embeds] - An array of embed objects to include in the webhook.
 * @param {Object} [args.allowed_mentions] - Specifies allowed mentions.
 * @param {Array} [args.components] - An array of components to include in the webhook.
 * @param {Array} [args.attachments] - An array of attachment objects to include in the webhook.
 * @param {boolean} [args.tts] - Whether to send the message as a TTS message.
 * @param {number} [args.flags] - Additional flags for the message.
 * @param {string} [args.username] - The username to display for the webhook.
 * @param {string} [args.avatar_url] - The avatar URL to display for the webhook.
 * @param {string} [args.thread_name] - The name of the thread to send the message in.
 * @param {Array} [args.applied_tags] - An array of tags to apply to the message.
 * @param {boolean} [args.wait] - Whether to wait for the server's response.
 * @param {string} [args.thread_id] - The ID of the thread to send the message in.
 * @returns {Promise<Object>} - The result of the webhook execution.
 */
const executeWebhook = async ({
  webhook_id,
  webhook_token,
  content,
  embeds = [],
  allowed_mentions,
  components = [],
  attachments = [],
  tts,
  flags,
  username,
  avatar_url,
  thread_name,
  applied_tags = [],
  wait,
  thread_id
}) => {
  const baseUrl = 'https://discord.com/api/v10';
  const token = process.env.DISCORD_API_API_KEY;
  const url = `${baseUrl}/webhooks/${webhook_id}/${webhook_token}?wait=${wait || 'false'}&thread_id=${thread_id || ''}`;

  const formData = new URLSearchParams();
  if (content) formData.append('content', content);
  if (embeds.length) embeds.forEach(embed => formData.append('embeds', JSON.stringify(embed)));
  if (allowed_mentions) formData.append('allowed_mentions', JSON.stringify(allowed_mentions));
  if (components.length) components.forEach(component => formData.append('components', JSON.stringify(component)));
  if (attachments.length) attachments.forEach(attachment => formData.append('attachments', JSON.stringify(attachment)));
  if (tts !== undefined) formData.append('tts', tts);
  if (flags !== undefined) formData.append('flags', flags);
  if (username) formData.append('username', username);
  if (avatar_url) formData.append('avatar_url', avatar_url);
  if (thread_name) formData.append('thread_name', thread_name);
  if (applied_tags.length) applied_tags.forEach(tag => formData.append('applied_tags', tag));

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Authorization': `Bot ${token}`
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  } catch (error) {
    console.error('Error executing webhook:', error);
    return {
      error: `An error occurred while executing the webhook: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for executing a webhook on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeWebhook,
  definition: {
    type: 'function',
    function: {
      name: 'execute_webhook',
      description: 'Execute a webhook on Discord.',
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
            description: 'The content to send in the webhook.'
          },
          embeds: {
            type: 'array',
            description: 'An array of embed objects to include in the webhook.'
          },
          allowed_mentions: {
            type: 'object',
            description: 'Specifies allowed mentions.'
          },
          components: {
            type: 'array',
            description: 'An array of components to include in the webhook.'
          },
          attachments: {
            type: 'array',
            description: 'An array of attachment objects to include in the webhook.'
          },
          tts: {
            type: 'boolean',
            description: 'Whether to send the message as a TTS message.'
          },
          flags: {
            type: 'integer',
            description: 'Additional flags for the message.'
          },
          username: {
            type: 'string',
            description: 'The username to display for the webhook.'
          },
          avatar_url: {
            type: 'string',
            description: 'The avatar URL to display for the webhook.'
          },
          thread_name: {
            type: 'string',
            description: 'The name of the thread to send the message in.'
          },
          applied_tags: {
            type: 'array',
            description: 'An array of tags to apply to the message.'
          },
          wait: {
            type: 'boolean',
            description: 'Whether to wait for the server\'s response.'
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