const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name:{type:String , required : true},
    date:{type:String , required:true },
    reason:{type:String, required:true},
}, {timestamps:true}); 

module.exports = mongoose.model('Appointment', appointmentSchema);