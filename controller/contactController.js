const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


// @ desc get all contacts
// @ route GET /api/contact
// @ access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    if (!contacts) {
        return res.status(400).json({ message: "No contacts found" });
    }

    res.status(200).json(contacts);
    console.log(`All  ${contacts.length} contacts found`);
});

// @ desc get contact by id
// @ route GET /api/contact/:id
// @ access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        return res.status(400).json({ message: "Contact not found" });
    }
    console.log(`Contact found with name --> ${contact.name}`);
    res.status(200).json(contact);
});

// @ desc create contact
// @ route POST /api/contact
// @ access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Please provide all fields" });

    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    if (!contact) {
        return res.status(400).json({ message: "Contact not created" });
    }
    res.status(201).json(contact);
    console.log(`Contact created with name ${contact.name}--> Email ${contact.email}`);
});

// @ desc update contact
// @ route PUT /api/contact/:id
// @ access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        return res.status(400).json({ message: "Contact not found" });
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error(`User don't have permission to update other user contacts`);
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!updateContact) {
        return res.status(400).json({ message: "Contact not updated" });
    }

    res.status(200).json(updateContact);
    console.log(`Contact updated with id ${req.params.id}`);
});

// @ desc delete contact
// @ route DELETE /api/contact/:id
// @ access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        return res.status(400).json({ message: "Contact not found" });
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error(`User don't have permission to delete other user contacts`);
    }

    const deleteContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deleteContact) {
        return res.status(400).json({ message: "Contact not deleted" });
    }
    res.status(200).json({ message: `Contact with id ${req.params.id} deleted` });
    console.log(`Contact deleted with id ${req.params.id}`);
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
}