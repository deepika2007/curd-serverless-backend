const updateUser = async (client, params, event) => {
    try {

        const { id } = params;
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "User ID is required" })
            };
        }

        const { name, email, password, phone_number, user_type } = event;
        if (!name || !email || !password || !user_type) {
            return { statusCode: 400, body: JSON.stringify({ error: "All fields are required" }) };
        }

        await client.query(
            `UPDATE users SET name=$1, email=$2, password=$3, phone_number=$4, user_type=$5 WHERE user_id=$6`,
            [name, email, password, phone_number, user_type, id]
        );

        return { statusCode: 200, body: JSON.stringify({ message: 'User updated successfully' }) };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};

module.exports = updateUser