import express from "express";

import { loginController } from "../controllers/AuthController.js";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";

//route object
const router = express.Router();

// routing

// login || method POST
router.post('/login', loginController);


//protected routes user auth
router.get('/user-auth',requireSignIn, (req, res) => {
    res.status(200).send({ok:true})
})

//protected routes admin auth
router.get('/admin-auth',requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok:true})
})

export default router;