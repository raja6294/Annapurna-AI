const generateListingId = () => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FOOD-${ts}-${rand}`;
};

module.exports = { generateListingId };
