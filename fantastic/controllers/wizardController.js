const connection = require("../config/db");
const bcrypt = require("bcrypt");
const { main } = require("../config/nodemailer");

class WizardController {
  getAllWizard = (req, res) => {
    let sql = `SELECT * FROM wizard WHERE is_active  = true`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allWizard", { result });
    });
  };

  //   Muestra la vista de perfil de un wizard con sus criaturas
  viewOneWizard = (req, res) => {
    let wizard_id = req.params.id;
    let sqlWizard = `SELECT * FROM wizard WHERE is_active = true AND wizard_id = ${wizard_id}`;
    let sqlCreature = `SELECT * FROM creature WHERE is_active = true AND wizard_id = ${wizard_id}`;
    connection.query(sqlWizard, (errorWizard, resultWizard) => {
      if (errorWizard) throw errorWizard;
      connection.query(sqlCreature, (errorCreature, resultCreature) => {
        if (errorCreature) throw errorCreature;
        res.render("oneWizard", { resultWizard, resultCreature });
      });
    });
  };

    //   Muestra la vista de perfil de un wizard con sus criaturas con edicion
    viewOtherOneWizard = (req, res) => {
      let wizard_id = req.params.id;
      let sqlWizard = `SELECT * FROM wizard WHERE is_active = true AND wizard_id = ${wizard_id}`;
      let sqlCreature = `SELECT * FROM creature WHERE is_active = true AND wizard_id = ${wizard_id}`;
      connection.query(sqlWizard, (errorWizard, resultWizard) => {
        if (errorWizard) throw errorWizard;
        connection.query(sqlCreature, (errorCreature, resultCreature) => {
          if (errorCreature) throw errorCreature;
          res.render("otherOneWizard", { resultWizard, resultCreature });
        });
      });
    };

  //   Muestra el formulario de registro
  viewRegisterForm = (req, res) => {
    res.render("registerForm", { message: "" });
  };

  //   Registra un nuevo wizard
  register = (req, res) => {
    let { name, house, blood_status, email, password } = req.body;
    let img = "";
    if (req.file != undefined) {
      img = req.file.filename;
    } else {
      img = "user.jpg";
    }

    // Encriptamos contraseña
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;
      //   console.log(hash);
      let sql = `INSERT INTO wizard (wizard_name, house, blood_status, email, password, wizard_avatar) VALUES ("${name}", "${house}", "${blood_status}", "${email}", "${hash}", "${img}")`;

      connection.query(sql, (error, result) => {
        console.log(error);
        // si da error
        if (error) {
          // si el error es por email duplicado
          if (error.code == "ER_DUP_ENTRY") {
            res.render("registerForm", { message: "Email already exists" });
          } else {
            // si es otro tipo de error
            throw error;
          }
        } else {
          let mail = `${email}`;
          main(mail);
          // si no da error
          res.render("registerForm", {
            message: "Wizard created correctly 🪄",
          });
        }
      });
    });
  };

  // Muestra el formulario de login
  viewLoginForm = (req, res) => {
    res.render("loginForm", { message: "" });
  };

  // Comprueba las credenciales de logueo
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM wizard WHERE email = '${email}' AND is_active = true`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        // el email es correcto y comprobamos la contraseña
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (resultCompare) {
            // email y contraseña correctos
            res.redirect(`/wizard/oneWizard/${result[0].wizard_id}`);
          } else {
            // email correcto, pero contraseña incorrecta
            res.render("loginForm", { message: "Wrong password" });
          }
        });
      } else {
        // como mínimo el email es incorrecto
        res.render("loginForm", { message: "Wrong email" });
      }
    });
  };

    // Renderiza la vista del formulario de edición del mago
    viewEditForm = (req, res) => {
      let wizard_id = req.params.wizard_id;
      let sql = `SELECT * FROM wizard WHERE wizard_id = ${wizard_id}`;
  
      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.render("editWizard", { result });
      });
    };
  
    // Recoge la información modificada del mago
    saveEditWizard = (req, res) => {
      let wizard_id = req.params.wizard_id;
      let { name, email, password } = req.body;
  
      let sql = `UPDATE wizard SET wizard_name = '${name}', email = '${email}'`;
      let final = ` WHERE wizard_id = ${wizard_id}`;
  
      if (req.file != undefined) {
        let img = req.file.filename;
        sql += `, wizard_avatar = '${img}'`;
      }
      if (password != "") {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) throw error;
  
          sql += `, password = '${hash}'`;
          sql += final;
  
          connection.query(sql, (error, result) => {
            if (error) throw error;
            res.redirect(`/wizard/oneWizard/${wizard_id}`);
          });
        });
      } else {
        sql += final;
        connection.query(sql, (error2, result) => {
          if (error2) throw error2;
          res.redirect(`/wizard/oneWizard/${wizard_id}`);
        });
      }
    };

    // Borrado lógico de wizard
    logicDeleteWizard = (req, res) => {
      let wizard_id = req.params.id;
      let sqlCreature = `UPDATE creature SET is_active = false WHERE wizard_id = ${wizard_id}`
      let sqlWizard = `UPDATE wizard SET is_active = false WHERE wizard_id = ${wizard_id}`;
  
      connection.query(sqlCreature, (error, result) => {
        if (error) throw error;
        connection.query(sqlWizard, (error, result) => {
          if (error) throw error;
          res.redirect("/wizard");
        });
      });
    };
}

module.exports = new WizardController();
