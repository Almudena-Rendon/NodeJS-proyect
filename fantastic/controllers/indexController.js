const connection = require("../config/db");

class IndexController {
  // Muestra la vista home

  viewHome = (req, res) => {
    let sql = `SELECT * FROM wizard WHERE is_active = true`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result });
    });
  };
}

module.exports = new IndexController();
