export const VerifInput = (s) => {
  const banStrings = ["<", ">", "select", "update", "delete", "from"];
  for (const banString in banStrings) {
    if (s.includes(banString)) {
      return false;
    }
  }
  return true;
};

export const VerifEmail = (s) => {
  return s
    .toLowerCase()
    .match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/");
};
