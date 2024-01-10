exports.VerifInput = (s) => {
  // return true if the input is valide else false
  const banStrings = ["<", ">", "select", "update", "delete", "from"];
  banStrings.forEach((banString) => {
    if (s.includes(banString)) {
      console.log(banString, "ban");
      return false;
    }
  });
  console.log("valid input");
  return true;
};

exports.VerifEmail = (s) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(s);
};

exports.VerifName = (s, minLength = 3, maxLength = 25) => {
  //return true if the name is valid else false
  // caract allowed : 'A-z' ' ' 'À-ú
  // length allowed : minLength <= currentLength <= maxLength
  const regx = new RegExp(`^[\\w\\sÀ-ú]{${minLength},${maxLength}}$`);
  return regx.test(s) && this.VerifInput(s);
};

exports.VerifImage = (s) => {
  // const regx = new RegExp(`(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)`, "g");
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(s);
};

exports.VerifArray = (a) => {
  for (const v of a) {
    if (!this.VerifName(v, 3, 25)) return false;
  }
  return true;
};

// exports.VerifDate = (date) => {
//   const dateMoment = moment(date, "DD/MM/YYYY");
//   return !isNaN(new Date(dateArr[2], dateArr[1] - 1));
// };
