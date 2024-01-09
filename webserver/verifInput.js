exports.VerifInput = (s) => {
  const banStrings = ["<", ">", "select", "update", "delete", "from"];
  for (const banString in banStrings) {
    if (s.includes(banString)) {
      return false;
    }
  }
  return true;
};

exports.VerifEmail = (s) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(s);
};

exports.VerifName = (s, minLength = 3, maxLength = 25) => {
  const regx = new RegExp(`^[\\w\\s]{${minLength},${maxLength}}$`);
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
