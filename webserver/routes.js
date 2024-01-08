const express = require("express");

const router = express.Router();
const stuffCtrl = require("./controllers.js");

//clubs
router.get('/clubs',stuffCtrl.getClubs)
router.post('/clubs',stuffCtrl.addClub)

//