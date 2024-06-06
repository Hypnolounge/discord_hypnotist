import knex from "knex";

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./data.db",
    },
    useNullAsDefault: true,
});

// Create a table to store session data
db.schema.createTable("sessions", (table) => {
    table.increments("id").primary();
    table.string("session_id").notNullable();
    table.string("token").notNullable();
    table.json("user_data").notNullable();
    table.timestamp("expiration").notNullable(); // Add expiration column
}).then(() => {
    console.log("Sessions table created successfully");
}).catch((error) => {
    console.error("Error creating sessions table:", error);
});

// Function to insert a new session
export async function insertSession(sessionId: string, token: string, userData: object, expiration: Date) {
    try {
        await db("sessions").insert({
            session_id: sessionId,
            token: token,
            user_data: JSON.stringify(userData),
            expiration: expiration.toISOString(), // Convert expiration date to ISO string
        });
        console.log("Session inserted successfully");
    } catch (error) {
        console.error("Error inserting session:", error);
    }
}

// Function to update the session id for a user
export async function updateSessionId(oldSessionId: string, newSessionId: string): Promise<void> {
    try {
        const expiration = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Set expiration to 2 weeks from now
        await db("sessions").where("session_id", oldSessionId).update({ session_id: newSessionId, expiration: expiration.toISOString() });
        console.log("Session id updated successfully");
    } catch (error) {
        console.error("Error updating session id:", error);
    }
}

// Function to update the expiration for a session
// Function to update the expiration for a session
export async function updateExpiration(sessionId: string): Promise<void> {
    try {
        const expiration = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Set expiration to 2 weeks from now
        await db("sessions").where("session_id", sessionId).update({ expiration: expiration.toISOString() });
        console.log("Expiration updated successfully");
    } catch (error) {
        console.error("Error updating expiration:", error);
    }
}

// Function to generate a new session id
export async function generateSessionId() {
    let sessionId = "";
    let isUnique = false;

    while (!isUnique) {
        sessionId = generateRandomId(); // Replace with your logic to generate a random session id

        // Check if the generated session id already exists in the database
        const existingSession = await db("sessions").where("session_id", sessionId).first();
        isUnique = !existingSession;
    }

    return sessionId;
}

function generateRandomId(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 32;
    let sessionId = "";

    for (let i = 0; i < length; i++) {
        sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return sessionId;
}

export async function isSessionExpired(sessionId: string): Promise<boolean> {
    try {
        const session = await db("sessions").where("session_id", sessionId).first();
        if (session) {
            const expiration = new Date(session.expiration);
            return expiration < new Date;
        }
        return true;
    } catch (error) {
        console.error("Error checking session expiration:", error);
        return true;
    }
}

// Usage example
const sessionId = "123456";
const token = "abc123";
const userData = { name: "John Doe", age: 30 };
const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set expiration to 24 hours from now

insertSession(sessionId, token, userData, expiration);

const isExpired = await isSessionExpired(sessionId);
console.log("Is session expired?", isExpired);