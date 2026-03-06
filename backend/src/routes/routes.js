import express from 'express';
import { addProperty, allUsersData, authCheck, getAllUsersProperty, getPropert, getSinglePropert, getUserPropertyId, getUsersReq, logout, updateUserData, userLogin, userReq, userSignUp } from '../controllers/controller.js';
import verifytoken from '../../middleware/auth.js';
import { allowRoles } from '../../middleware/checkRole.js';
import upload from '../../middleware/multer.js';


const router = express.Router();


router.post('/userSignUp', userSignUp)

router.post('/userLogin', userLogin)

router.post('/addproperty', verifytoken, allowRoles(["sale", "admin"]), upload.array("images", 6), addProperty);

router.get('/getProperty', getPropert)

router.get('/getSingleProperty/:id', getSinglePropert);

router.get('/addPropertyAuth', verifytoken, authCheck);

router.get('/getUsersData', verifytoken, allUsersData);

router.put('/updateUserData/:id', verifytoken, updateUserData);

router.get('/getUsersProperty', verifytoken, getAllUsersProperty);

router.put('/getPropertyId/:id', verifytoken, getUserPropertyId);

router.post('/reqUserClient/:id', userReq);

router.get('/getUsersReq', verifytoken, getUsersReq);

router.post('/logout', logout);

export default router;


// router.post('/admin', adminSign)