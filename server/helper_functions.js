const today = () => {
  let today = new Date();
  return today.toLocaleDateString();
};

module.exports = { today };
