module.exports = function () {
  const routers = [
    './task',
  ];

  return routers.reduce(function (acc, route) {
    try {
      const tempRoute = require(route);
      return acc.concat(tempRoute);
    } catch (e) {
      console.error('Unable to load route:', route, e);
    }
  }, []);
};
