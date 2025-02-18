import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    name:String,
    Value:Number,
});

const DataModel = mongoose.models.Data || mongoose.model('Data',dataSchema);
del('Data',dataSchema);

export default DataModel;