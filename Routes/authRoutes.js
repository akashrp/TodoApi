const express= require('express');
const { home, createAccount, login, dashboard } = require('../Controllers/authController');
const auth = require('../Middleware/authMiddleware');

const router= express.Router();
// router.get("/auth",home);
router.post("/reegister",createAccount);
router.post("/login",login);
// router.get("/dashboard",auth, dashboard);

module.exports=router;