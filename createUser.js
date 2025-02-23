const createUser = async (client, event) => {
    try {
        const { name, email, password, phone_number, user_type } = event;
        const result = await client.query(
            'INSERT INTO "users" (name, email, password, phone_number, user_type ) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
            [name, email, password, phone_number, user_type]
        );

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'User created successfully',
                user_id: result.rows[0].user_id
            })
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = createUser