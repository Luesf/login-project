import {query} from '../db.js';

export const getUsers = async() => {
    const {rows} = await query('SELECT * FROM users_tb');
    return rows;
};

export const createUser = async(userData) => {
    const {email, password} = userData;
    const {rows} = await query('INSERT INTO users_tb (email, password) VALUES ($1, $2) RETURNING *',[email, password]);
    return rows[0];
};