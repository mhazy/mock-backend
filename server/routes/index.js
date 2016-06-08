const routers = [
  './tasks',
];

const routes = routers.reduce((acc, route) => {
  const tempRoute = require(route);
  return acc.concat(tempRoute);
}, []);

module.exports = routes;
