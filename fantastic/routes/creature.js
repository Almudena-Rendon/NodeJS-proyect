var express = require("express");
const creatureController = require("../controllers/creatureController");
const uploadImage = require("../middleware/multer");
var router = express.Router();

// Ruta base del archivo: localhost:3000/creature

// Muestra todas las criaturas de todos los wizards que no estén borradas
// localhost:3000/creature
router.get("/", creatureController.viewAllCreatures);

// Muestra el formulario de crear una nueva criatura desde el perfil de wizard
// localhost:3000/creature/addCreature/:id
router.get("/addCreature/:id", creatureController.viewaddCreatureForm);

//Guarda la informacion de crear una nueva criatura desde el perfil de wizard
// localhost:3000/creature/addCreature/:id
router.post("/addCreature/:id", uploadImage("creatures"), creatureController.saveUserCreature);

// Renderiza el formulario de crear una nueva criatura desde el navbar
// localhost:3000/creature/addCreature
router.get("/addCreature", creatureController.addCreatureNavbar);

// Guarda la información de una nueva criatura desde el formulario del navbar
// localhost:3000/creature/addCreature
router.post("/addCreature", uploadImage("creatures"), creatureController.saveCreature);

// Elimina de manera lógica una criatura
// localhost:3000/creature/logicDelete/:creature_id/:wizard_id
router.get("/logicDelete/:creature_id/:wizard_id", creatureController.logicDelete);

// Elimina de manera real una obra de arte
// localhost:3000/creature/delete/:creature_id/:wizard_id
router.get("/delete/:creature_id/:wizard_id", creatureController.delete);

// Renderiza la vista para editar una criatura
// localhost:3000/creature/editCreature/:creature_id
router.get("/editCreature/:creature_id", creatureController.viewEditForm);

// Guarda la información editada de una criatura
// localhost:3000/creature/editCreature/:creature_id/:wizard_id
router.post(
  "/editCreature/:creature_id/:wizard_id",
  uploadImage("creatures"),
  creatureController.saveEditCreature
);

module.exports = router;