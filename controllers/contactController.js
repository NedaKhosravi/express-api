const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access private

const getContacts = asyncHandler(async(req, res) => {
   
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

// @desc Create New contact
// @route POST /api/contacts
// @access private

const createContact = asyncHandler(async(req, res) => {
    console.log("body", req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    res.status(201).json(contact);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private

const getContact = asyncHandler(async(req, res) => {
    console.log("id", req.params.id);
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            
            res.status(404);
            throw new Error("Contact not found")
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({error});
    }
   
});


// @desc Update contact
// @route UPDATE /api/contacts/:id
// @access private

const updateContact =asyncHandler(async(req, res) => {
    try {

        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found")
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User don't have permission to update other user contacts")
        }

        const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
        
        res.status(200).json(updateContact);
    } catch (error) {
        res.status(404).json({error});
    }
});


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private

const deleteContact =asyncHandler(async(req, res) => {
    try {
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        
        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User don't have permission to delete other user contacts")
        }
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Contact removed" });
    } catch (error) {
        res.status(404).json({error});
    }
    
});


module.exports = {getContacts, createContact, getContact,updateContact, deleteContact};