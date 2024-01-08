const express = require("express");

const router = express.Router();
const stuffCtrl = require("./controllers.js");

//clubs
router.get('/clubs',stuffCtrl.getClubs)
router.post('/clubs',stuffCtrl.addClub)
router.post('/clubsUpdate',stuffCtrl.updateClub)

//users
router.get('/users',stuffCtrl.getUsers)
router.post('/users',stuffCtrl.addUser)

router.post('/clubMember',stuffCtrl.addClubMember)

//roles
router.post('/roles',stuffCtrl.addRole)
router.post('/updateRoleMember',stuffCtrl.updateRoleMember)

//event
router.get('/events',stuffCtrl.getEvent)
router.post('/events',stuffCtrl.addEvent)

//tag
router.post('/tags',stuffCtrl.addTag)
router.delete('/tags',stuffCtrl.deleteTagClub)