const getUser = async (client, params) => {
    try {
        if (!params || !params.id) {
            const result = await client.query('SELECT * FROM "users"');
            return { statusCode: 200, body: JSON.stringify(result.rows) };
        }

        const result = await client.query('SELECT * FROM "users" WHERE user_id = $1', [params.id]);
        if (!result) {
            return { statusCode: 404, body: JSON.stringify({ error: "User not found." }) }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(result.rows[0] || {})
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = getUser