const deleteUser = async (client, event) => {
    try {
        const { id } = event;
        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ message: "User ID is required" }) };
        }

        const result = await client.query('DELETE FROM "users" WHERE user_id = $1', [id]);
        if (result.rowCount === 0) {
            return { statusCode: 404, body: JSON.stringify({ message: "User not found" }) };
        }

        return { statusCode: 200, body: JSON.stringify({ message: "User deleted successfully" }) };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { statusCode: 400, body: JSON.stringify({ error: error.message }), };
    }
};

module.exports = deleteUser