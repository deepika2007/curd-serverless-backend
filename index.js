const getClient = require('./db');
const createUser = require('./createUser.js');
const getUser = require('./getUser.js');
const updateUser = require('./updateUser.js');
const deleteUser = require('./deleteUser.js');

exports.handler = async (event) => {
  const client = getClient();
  let response;
  try {
    await client.connect();

    switch (event?.requestContext?.http?.method) {
      case 'POST': // Create User
        response = await createUser(client, JSON.parse(event.body));
        break;
      case 'GET': // Read User
        response = await getUser(client, event.pathParameters);
        break;
      case 'PUT': // Update User
        if (!event.pathParameters || !event.pathParameters.id) {
          response = { statusCode: 400, body: JSON.stringify({ message: 'User  ID is required' }) };
        } else {
          response = await updateUser(client, event.pathParameters, JSON.parse(event.body));
        }
        break;
      case 'DELETE': // Delete User
        if (!event.pathParameters || !event.pathParameters.id) {
          response = { statusCode: 400, body: JSON.stringify({ message: 'User  ID is required' }) };
        } else {
          response = await deleteUser(client, event.pathParameters);
        }
        break;
      default:
        response = { statusCode: 400, body: JSON.stringify({ message: 'Invalid HTTP Method' }) };
    }
  } catch (error) {
    console.error('Error:', error);
    response = { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  } finally {
    await client.end().catch(err => console.error('Error closing DB connection:', err));
  }

  return response;
};