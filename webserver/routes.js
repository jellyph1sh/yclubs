const express = require("express");

const router = express.Router();
const stuffCtrl = require("./controlers.js");

//clubs
router.get("/clubs/getall", stuffCtrl.getClubs);
// router.get("/clubs/get_one", stuffCtrl.getOneClubs);
router.post("/clubs/add", stuffCtrl.addClub);
router.post("/clubs/update", stuffCtrl.updateClub);
// router.delete('/clubs/delete',stuffCtrl.deleteClub)

//users
// router.get("/users/getall", stuffCtrl.getUsers);
// router.get("/users/get_one", stuffCtrl.getOneUsers);
router.post("/users/add", stuffCtrl.addUser);

//clubMember
router.post('/clubMember/add',stuffCtrl.addClubMember)
// router.delete('/clubMember/delete',stuffCtrl.deleteClubMember)

//roles
router.post("/roles/add", stuffCtrl.addRole);
// router.delete("/roles/delete", stuffCtrl.deleteRole);

//rolesMember
router.post('/roleMember/update',stuffCtrl.updateRoleMember)

//tag
router.post('/tags/add',stuffCtrl.addTag)
// router.delete('/tagsClubs/delete',stuffCtrl.deleteTagClub)

//event
router.get("/events/getall", stuffCtrl.getEvent);
// router.get("/events/getClub", stuffCtrl.getClubEvent);
// router.get("/events/getOne", stuffCtrl.getOneEvent);
router.post("/events/add", stuffCtrl.addEvent);

router.post("/capital", stuffCtrl.manageCapitalClub);

module.exports = router;

