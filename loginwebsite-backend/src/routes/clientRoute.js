import express from 'express';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

router.get("/users", clientController.getUsers);

router.post("/users", clientController.createUser);

export default router;