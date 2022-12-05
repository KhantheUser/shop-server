const app  = require('./app');
const dotenv = require('dotenv');

dotenv.config(
    {
        path :'./util/.env'
    }
);


const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('listens d ')
})