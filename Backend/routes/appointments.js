const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments 
router.get('/', async(req,res)=> {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch(error) {
        res.status(500).json({error: 'server error'});
    }
});

// Create new appointment 
router.post('/', async(req,res)=>{
    const{name,date,reason} = req.body;
    try {
        const newAppt = await Appointment.create({name, date , reason});
        res.status(201).json(newAppt); 
    } catch (error) {
        res.status(400).json({error: 'Invalid Data'});
    }
});

// Delete appointment by ID 
router.delete('/:id', async(req,res)=> {
    try {
       await Appointment.findByIdAndDelete(req.params.id);
       res.json({message:'Appointment deleted'}); 
    } catch (error) {
        res.status(404).json({error:'Appointment not found'});
    }
});

// PUT update appointment
router.put('/:id', async (req, res) => {
  const { name, date, reason } = req.body;
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { name, date, reason },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update' });
  }
});



module.exports = router;