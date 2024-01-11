const stuffCtrlGet = require("../controlers/getControlers.js");

const VerifInput = (s) => {
  // return true if the input is valide else false
  if (s == null) return false;
  const banStrings = ["<", ">", "select", "update", "delete", "from"]; // those string are ban for prevent sql injection
  for (const banString of banStrings) {
    if (s.includes(banString)) {
      console.log(banString, "ban");
      return false;
    }
  }
  console.log("valid input");
  return true;
};

const VerifEmail = (s) => {
  // check if the email is in the correct format
  if (s == undefined) return false;
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(s);
};

const VerifName = (s, minLength = 3, maxLength = 25) => {
  // return true if the name is valid else false
  // caract allowed : 'A-z' ' ' 'À-ú
  // length allowed : minLength <= currentLength <= maxLength
  // caract not allowed : special caracters (!:, etc)
  if (s == null) return false;
  const regx = new RegExp(`^[\\w\\sÀ-ú]{${minLength},${maxLength}}$`);
  return regx.test(s) && VerifInput(s);
};

const VerifTags = (a) => {
  // allow to check every tags of an array
  for (const v of a) {
    if (!VerifName(v, 3, 20)) return false;
  }
  return true;
};

// ManageVerif return "" if all data are valid otherwise it return the error code of the first error that is catch
// This function is usefull for prevent sql injection or corrupt data
//
// Possible action :
//    1) check if string data are valid
//       (clubName,name,password,alias,description,tags)
//
//    2) check if some data are in right format
//       (email,image,date)
//
//    3) check if number data are in right format
//       (capital,id)
//
//    4) check if some data are consistent with the database
//       (userExistId,clubExistId)
// Error code :
//       (invalidClubName,invalidParentClubName,invalidRoleName,invalidName,
//        invalidEmail,invalidPassword,invalidDate,invalidAlias,
//        invalidDescription,invalidTags,invalidCapital,invalidId,invalidUserId,
//        invalidClubId
//        invalidDataType
//       )
exports.ManageVerif = (elementsToCheck) => {
  for (const element of elementsToCheck) {
    switch (element.dataType) {
      case "clubName":
        if (!VerifName(element.data, 3, 20)) {
          return "invalidClubName";
        }
        break;
      case "parentClubName": {
        if (element.data != null) {
          if (VerifName(element.data, 3, 20)) {
            const club = stuffCtrlGet.getOneClubByName(element.data);
            if (club == "unknownClubName") {
              return "invalidParentClubName";
            }
          } else {
            return "invalidParentClubName";
          }
        }
        break;
      }
      case "roleAssign": {
        if (VerifName(element.data, 3, 20)) {
          const role = stuffCtrlGet.getOneRoleByName(element.data);
          if (isNaN(role)) {
            return "invalidRoleName";
          }
        } else {
          return "invalidRoleName";
        }

        break;
      }
      case "name":
        console.log(VerifName(element.data, 3, 25), element.data);
        if (!VerifName(element.data, 3, 25)) {
          return "invalidName";
        }
        break;
      case "email":
        if (!VerifEmail(element.data) || !VerifInput(element.data)) {
          return "invalidEmail";
        }
        break;
      case "password":
        if (
          !VerifInput(element.data) ||
          element.data.length < 3 ||
          element.data == null
        ) {
          return "invalidPassword";
        }
        break;
      case "date":
        if (
          isNaN(moment(event.date, "DD/MM/YYYY").toDate()) ||
          !VerifInput(event.date)
        ) {
          return "invalidDate";
        }
        break;
      case "alias":
        if (!VerifName(element.data, 2, 4)) {
          return "invalidAlias";
        }
        break;
      case "description":
        if (!VerifInput(element.data) || element.data.length >= 255) {
          return "invalidDescription";
        }
        break;
      case "tags":
        if (!isNaN(element.data)) {
          if (!VerifTags(element.data.split(" "))) {
            return "invalidTags";
          }
        }
        break;
      case "capital":
        if (isNaN(parseInt(element.data))) {
          return "invalidCapital";
        }
        break;
      case "id":
        if (isNaN(parseInt(element.data))) {
          return "invalidId";
        }
        break;
      case "userExistId":
        if (
          !isNaN(stuffCtrlGet.getUserById(element.data)) ||
          isNaN(parseInt(element.data))
        ) {
          return "invalidUserId";
        }
        break;
      case "clubExistId":
        if (
          !isNaN(stuffCtrlGet.getUserById(element.data)) ||
          isNaN(parseInt(element.data))
        ) {
          return "invalidClubId";
        }
        break;
      default:
        return "invalidDataType";
    }
  }
  return "";
};
