const express = require("express");

const contactRouter = express.Router();
const {getContacts, createContact, getContact, updateContact,deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

contactRouter.use(validateToken);
contactRouter.route("/").get(getContacts).post(createContact)

contactRouter.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = contactRouter;