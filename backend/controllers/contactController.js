import express from 'express';
import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';

export const  getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user: req.user.id});
    if(!contacts) {
        res.status(404);
        throw new Error('No contacts found');
    }
    res.status(200).json(contacts);
});

export const  getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

export const  postContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const contact = await Contact.create({
        user: req.user.id,
        name,
        email,
        phone,
    });
    res.status(201).json({ message: 'Contact POST request received', contact});
});

export const  putContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    contact.name = req.body.name || contact.name;
    contact.email = req.body.email || contact.email;
    contact.phone = req.body.phone || contact.phone;
    const updatedContact = await contact.save();
    res.status(200).json({ message: 'Updated Contact', contact });
});

export const  deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    contact.deleteOne();

    res.status(200).json({ message: 'Contact successfully deleted' });
});
