const pool = require('../db');

async function getMessages(from, to) {
  try {
    const query = `
    SELECT 
        message_text,
        sender_id
    FROM 
        messages
    WHERE 
    (receiver_id = $1 AND sender_id = $2)
    OR
    (receiver_id = $2 AND sender_id = $1)
    ORDER BY 
        updated_at ASC`;
    const values = [to, from]; 
    const result = await pool.query(query, values);
    return result.rows.map(row => ({
      fromSelf: row.sender_id === from,
      message: row.message_text,
    }));
  } catch (error) {
    throw error;
  }
}

async function addMessage(from, to, message) {
  try {
    console.log(`Adding message ${from} ${to} ${message}`);
    const query = `
    INSERT INTO 
        messages (message_text, receiver_id, sender_id) 
    VALUES 
        ($1, $2, $3)`;
    const values = [message, to, from];
    await pool.query(query, values);
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = { getMessages, addMessage };
