const connection = require("../config/db");
class CreatureController{

    // Muestra todas las criaturas magicas
    viewAllCreatures = (req, res) => {
      let sql = `SELECT * FROM creature WHERE is_active = true`;
  
      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.render("allCreatures", { result });
      });
    };

    // Muestra el formulario de crear una nueva criatura desde un perfil
    viewaddCreatureForm = (req, res) => {
    let id = req.params.id;
    res.render("createCreature", { wizard_id: id });
  };

  // Guarda la información de la nueva criatura de un wizard en concreto

  saveUserCreature = (req, res) => {
    let wizard_id = req.params.id;
    let creature_name = req.body.creature_name;
    let classification = req.body.classification;
    let description = req.body.description;
    let sql = `INSERT INTO creature (wizard_id, creature_name, classification, description) VALUES (${wizard_id}, '${creature_name}', '${classification}', '${description}');`;
    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO creature (wizard_id, creature_name, classification, creature_photo, description) VALUES (${wizard_id}, '${creature_name}', '${classification}', '${img}', '${description}');`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/wizard/oneWizard/${wizard_id}`);
    });
  };


 
  // Renderiza el formulario de crear una nueva criatura desde el navbar.
  addCreatureNavbar = (req, res) => {
    let sql = `SELECT wizard_name, wizard_id FROM wizard WHERE is_active = true`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("addCreature", { result });
    });
  };
    
   // Guarda la información de una criatura desde el formulario del navbar
   saveCreature = (req, res) => {
    let { creature_name, wizard_id,classification,description } = req.body;
    let sql = `INSERT INTO creature (wizard_id, creature_name, classification, description) VALUES (${wizard_id}, '${creature_name}', '${classification}', '${description}');`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO creature (wizard_id, creature_name, classification, description, creature_photo) VALUES (${wizard_id}, '${creature_name}', '${classification}', '${description}', '${img}');`;
    }
  
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/wizard/otherOneWizard/${wizard_id}`);
    });
  };

    // Elimina de manera lógica una criatura
    logicDelete = (req, res) => {
      let creature_id = req.params.creature_id;
      let wizard_id = req.params.wizard_id;
  
      let sql = `UPDATE creature SET is_active = false WHERE creature_id = ${creature_id}`;
  
      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect(`/wizard/oneWizard/${wizard_id}`);
      });
    };

      // Elimina de manera real una criatura
  delete = (req, res) => {
    let { creature_id, wizard_id } = req.params;

    let sql = `DELETE FROM creature WHERE creature_id = ${creature_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/wizard/oneWizard/${wizard_id}`);
    });
  };

   // Renderiza la vista para editar una criatura
   viewEditForm = (req, res) => {
    let creature_id = req.params.creature_id;
    let sql = `SELECT * FROM creature WHERE creature_id = ${creature_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editCreature", { result });
    });
  };

   // Guarda la información editada de una criatura
   saveEditCreature = (req, res) => {
    let creature_id = req.params.creature_id;
    let wizard_id = req.params.wizard_id;
    let creature_name = req.body.creature_name;
    let sql = `UPDATE creature SET creature_name = '${creature_name}' WHERE creature_id = ${creature_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE creature SET creature_name = '${creature_name}', creature_photo = '${img}' WHERE creature_id = ${creature_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/wizard/oneWizard/${wizard_id}`);
    });
  };
}

module.exports = new CreatureController();