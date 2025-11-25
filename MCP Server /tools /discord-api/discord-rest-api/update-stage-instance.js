/**
 * Function to update a stage instance on Discord.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.channel_id - The ID of the channel where the stage instance is located.
 * @param {string} args.topic - The new topic for the stage instance.
 * @param {Object} args.privacy_level - The privacy level of the stage instance.
 * @param {string} args.privacy_level.title - The title of the privacy level.
 * @param {string} args.privacy_level.description - A description of the privacy level.
 * @param {number} args.privacy_level.const - The constant value representing the privacy level.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ channel_id, topic, privacy_level }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/stage-instances/${channel_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      topic,
      privacy_level
    });

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
    console.error('Error updating stage instance:', error);
    return {
      error: `An error occurred while updating the stage instance: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a stage instance on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_stage_instance',
      description: 'Update properties of an existing stage instance on Discord.',
      parameters: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: 'The ID of the channel where the stage instance is located.'
          },
          topic: {
            type: 'string',
            description: 'The new topic for the stage instance.'
          },
          privacy_level: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'The title of the privacy level.'
              },
              description: {
                type: 'string',
                description: 'A description of the privacy level.'
              },
              const: {
                type: 'integer',
                description: 'The constant value representing the privacy level.'
              }
            },
            required: ['title', 'description', 'const']
          }
        },
        required: ['channel_id', 'topic', 'privacy_level']
      }
    }
  }
};

export { apiTool };