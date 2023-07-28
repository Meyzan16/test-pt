import  express from "express";

import { getUserController,
    createUserController, 
    userPhotoController,
    singleUserController,
    updateUserController,
    deleteUserController,
    updatedPasswordController
} 
from "../controllers/UserController.js";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import  formidable from 'express-formidable';

//route object
const router = express.Router();


router.get('/get-user', requireSignIn,isAdmin,getUserController);

router.post('/create-user', requireSignIn,isAdmin,formidable(), createUserController);

//get photo
router.get('/photo-user/:pid', userPhotoController);

router.get('/get-user/:id', requireSignIn,singleUserController);

router.put('/update-user/:id', requireSignIn,formidable(), updateUserController);

//delet users
router.delete('/delete-user/:id', requireSignIn,isAdmin, deleteUserController);

//Forget password || POST
router.post('/update-password',requireSignIn, updatedPasswordController);







export default router;