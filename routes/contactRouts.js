const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/accessTokenHandler");
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require("../controller/contactController");


// @ desc get all contacts
router.use(validateToken)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);




module.exports = router;
