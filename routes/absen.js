import express from "express";

import { checkInController,getCheckInSingleController,checkOutController,getCheckInController,getCheckOutController } from "../controllers/AbsenController.js";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";

//route object
const router = express.Router();

// routing

router.post('/check-in', requireSignIn,checkInController);
router.post('/check-out', requireSignIn,checkOutController);

router.get('/get-checkin', requireSignIn,isAdmin,getCheckInController);
router.get('/get-checkout', requireSignIn,isAdmin,getCheckOutController);



router.get('/check-in/:id',getCheckInSingleController);





export default router;