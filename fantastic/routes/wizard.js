var express = require("express");
const wizardController = require("../controllers/wizardController");
const uploadImage = require("../middleware/multer");
var router = express.Router();

// Ruta base : localhost:3000/wizard

// Muestra todos los wizard
// localhost:3000/wizard
router.get("/", wizardController.getAllWizard);

// Muestra la vista de perfil de un wizard con sus criaturas
// localhost:3000/wizard/oneWizard/:id
router.get("/oneWizard/:id", wizardController.viewOneWizard);

// Muestra la vista de perfil de un wizard con sus criaturas con edicion
// localhost:3000/wizard/otherOneWizard/:id
router.get("/otherOneWizard/:id", wizardController.viewOtherOneWizard);

// Muestra el formulario de registro
// localhost:3000/wizard/register
router.get("/register", wizardController.viewRegisterForm);

// Guarda los datos de un nuevo wizard
// localhost:3000/wizard/register
router.post("/register", uploadImage("wizards"), wizardController.register);

// Muestra el formulario de login
// localhost:3000/wizard/login
router.get("/login", wizardController.viewLoginForm);

// Comprueba las credenciales de logueo
// localhost:3000/wizard/login
router.post("/login", wizardController.login);

// Renderiza la vista del formulario de edición de wizard
// localhost:3000/wizard/editWizard/:wizard_id
router.get("/editWizard/:wizard_id", wizardController.viewEditForm);

// Recoge la información modificada del artista
// localhost:3000/wizard/editWizard/:wizard_id
router.post(
  "/editWizard/:wizard_id",
  uploadImage("wizards"),
  wizardController.saveEditWizard
);

// Borrado lógico de wizard
// localhost:3000/wizard/logicDelete/:wizard_id
router.get(
  "/logicDelete/:id",
  wizardController.logicDeleteWizard
);

module.exports = router;
