const routes = require("next-routes")();

routes
  .add("/tahminlerim/:address", "/myvotes") // :address passes as param;
  .add("/nasil-katilirim", "/howto")
  .add("/yarisma-kurallari", "/rules");

module.exports = routes;
