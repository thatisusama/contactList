const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

// retriving all contacts Get
router.get('/contacts', (req, res, next) => {
    Contact.find(function(err, contacts) {
        res.json(contacts);
    });
});

// retriving single contact Get
router.get('/contacts/:id', (req, res, next) => {
    Contact.findById({ _id: req.params.id }, function(err, contacts) {
        res.json(contacts);
    });
});

router.put('/contacts/:id', (req, res, next) => {
    Contact.findByIdAndUpdate(req.params.id, req.body, function(err, contacts) {
        res.json(req.body);
    });

});

// add contact Post
router.post('/contacts', (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });
    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: 'failed to add contact' });
        } else {
            res.json({ msg: 'contact has been added' });
        }
    });
});

// delete contact Delete
router.delete('/contacts/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = router;