const hydraxAPI = async (fId) =>
  await fetch(
    `https://api.hydrax.net/514a8855c6071331f28b67809888294a/drive/${fId}`
  )
    .then((res) => res.text())
    .then((body) => body);

module.exports = hydraxAPI;
