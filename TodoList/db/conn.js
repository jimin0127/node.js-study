module.exports = () => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/data', 
                    {userNewUrlParser:true});
    
    const db = mongoose.connection;
    
    db.on('err', () => {
        console.log('connection failed');
    })
    
    db.once('open', () => {
        console.log('connected');
    })
    
    const todo = mongoose.Schema({
        todo : String, 
        content : [String],
        createDate : Date,
        deadline : Date, 
        complate : Number
    })
    
    const Todo = mongoose.model('todo', todo);
    return Todo;
}