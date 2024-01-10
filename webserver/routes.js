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
router.post("/clubsMembers/add", stuffCtrl.addClubMember);
// router.post("/clubsMembers/update", stuffCtrl.updateClubMember);
router.post("/clubsMembers/updateRoles", stuffCtrl.updateRoleMember);
// router.delete('/clubsMembers/delete',stuffCtrl.deleteClubMember)

//roles
router.post("/roles/add", stuffCtrl.addRole);
// router.delete("/roles/delete", stuffCtrl.deleteRole);

//tag
router.post("/tags/addToClub", stuffCtrl.addTagToClub);
// router.delete('/tags/deleteToClubs',stuffCtrl.deleteTagToClub)


//event
router.get("/events/getall", stuffCtrl.getEvents);
router.post("/events/add", stuffCtrl.addEvent);
// router.get("/events/getClub", stuffCtrl.getClubEvent);
// router.get("/events/getOne", stuffCtrl.getOneEvent);

router.post("/capital", stuffCtrl.manageCapitalClub);

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
