const pool = require('../db');
const bcrypt = require('bcrypt');

async function loginUser(username, password) {
  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    console.log(`Server started on port 4000`);
    const user = result.rows[0];
    if (!user) {
      console.log(`Login User not found`);
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function registerUser(username, email, password) {
  try {
    console.log(`Trying to register user ${username}`);
    const usernameCheckQuery = 'SELECT * FROM users WHERE username = $1';
    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const usernameCheckResult = await pool.query(usernameCheckQuery, [username]);
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);
    if (usernameCheckResult.rows.length > 0) {
      return { msg: 'Username already used', status: false };
    }
    if (emailCheckResult.rows.length > 0) {
      return { msg: 'Email already used', status: false };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const insertResult = await pool.query(insertQuery, [username, email, hashedPassword]);
    const user = insertResult.rows[0];
    delete user.password;
    return { status: true, user };
  } catch (error) {
    throw error;
  }
}

async function getAllUsers(userId) {
  try {
    console.log(`Trying to get user ${userId}`);
    const query = 'SELECT email, username, avatar_image, _id FROM users WHERE _id != $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function setAvatar(userId, avatarImage) {
  try {
    console.log(`Trying to set Avatar ${userId}`);
    const query = 'UPDATE users SET is_avatar_image_set = true, avatar_image = $1 WHERE _id = $2 RETURNING *';
    const result = await pool.query(query, [avatarImage, userId]);
    const userData = result.rows[0];

    return { isSet: userData.is_avatar_image_set, image: userData.avatar_image };
  } catch (error) {
    throw error;
  }
}

async function logOut(userId) {
  try {
    // Implementation for logging out, if necessary
  } catch (error) {
    throw error;
  }
}

module.exports = { loginUser, registerUser, getAllUsers, setAvatar, logOut };
