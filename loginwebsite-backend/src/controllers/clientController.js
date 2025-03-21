import * as clientServices from '../services/clientServices.js';

export const getUsers = async(req, res) => {
    try {
        const users = await clientServices.getUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Internal server error."});
    }
}

export const createUser = async(req, res) => {
    try {
        const userData = req.body;
        const newUser = await clientServices.createUser(userData);

        res.status(200).json(newUser);
    } catch (err) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Internal server error."});
    }
}