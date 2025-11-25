/**
 * Function to create a response to an interaction from the Discord Gateway.
 *
 * @param {Object} args - Arguments for the interaction response.
 * @param {string} args.interaction_id - The ID of the interaction.
 * @param {string} args.interaction_token - The token of the interaction.
 * @param {number} args.type - The type of the response (e.g., 8 for a message response).
 * @param {Array} [args.choices=[]] - The choices for the response, if applicable.
 * @returns {Promise<Object>} - The result of the interaction response creation.
 */
const executeFunction = async ({ interaction_id, interaction_token, type, choices = [] }) => {
  const baseUrl = 'https://discord.com/api/v10';
  const botToken = ''; // will be provided by the user

  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/interactions/${interaction_id}/${interaction_token}/callback`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bot ${botToken}`
    };

    // Prepare the body data
    const bodyData = new URLSearchParams();
    bodyData.append('type', type);
    if (choices.length > 0) {
      bodyData.append('choices', JSON.stringify(choices));
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: bodyData
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the response data
    return {
      status: response.status,
      message: 'Response created successfully.'
    };
  } catch (error) {
    console.error('Error creating interaction response:', error);
    return {
      error: `An error occurred while creating the interaction response: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating interaction responses on Discord.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_interaction_response',
      description: 'Create a response to an interaction from the Discord Gateway.',
      parameters: {
        type: 'object',
        properties: {
          interaction_id: {
            type: 'string',
            description: 'The ID of the interaction.'
          },
          interaction_token: {
            type: 'string',
            description: 'The token of the interaction.'
          },
          type: {
            type: 'number',
            description: 'The type of the response.'
          },
          choices: {
            type: 'array',
            description: 'The choices for the response.'
          }
        },
        required: ['interaction_id', 'interaction_token', 'type']
      }
    }
  }
};

export { apiTool };