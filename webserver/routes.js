const express = require("express");

const router = express.Router();
const stuffCtrlAdd = require("./controlers/addControlers.js");
const stuffCtrlGet = require("./controlers/getControlers.js");
const stuffCtrlUpdate = require("./controlers/updateControlers.js");
const stuffCtrlDelete = require("./controlers/deleteControlers.js");

//clubs
router.get("/clubs/getall", stuffCtrlGet.getClubs);
// router.get("/clubs/get_one", stuffCtrlGet.getOneClubs);
router.post("/clubs/add", stuffCtrlAdd.addClub);
router.post("/clubs/update", stuffCtrlUpdate.updateClub);
// router.delete('/clubs/delete',stuffCtrlDelete.Club)

//users
// router.get("/users/getall", stuffCtrlGet.getUsers);
// router.get("/users/get_one", stuffCtrlGet.getOneUsers);
router.post("/users/add", stuffCtrlAdd.addUser);

//clubMember
router.post("/clubsMembers/add", stuffCtrlAdd.addClubMember);
// router.post("/clubsMembers/update", stuffCtrlUpdate.updateMember);
router.post("/clubsMembers/updateRoles", stuffCtrlUpdate.updateRoleMember);
// router.delete('/clubsMembers/delete',stuffCtrlDelete.ClubMember)

//roles
router.post("/roles/add", stuffCtrlAdd.addRole);
// router.delete("/roles/delete", stuffCtrlDelete.Role);

//tag
router.post("/tags/addToClub", stuffCtrlAdd.addTagToClub);
// router.delete('/tags/deleteToClubs',stuffCtrlDelete.deleteTagClub)


//event
router.get("/events/getall", stuffCtrlGet.getEvents);
router.post("/events/add", stuffCtrlAdd.addEvent);
// router.get("/events/getClub", stuffCtrlGet.getClubEvent);
// router.get("/events/getOne", stuffCtrl.getOneEvent);

router.post("/capital/update", stuffCtrlUpdate.updateCapitalClub);

module.exports = router;

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const fusion = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };

  return fusion(mergeSort(left), mergeSort(right));
}
a = 1;
a = 2;