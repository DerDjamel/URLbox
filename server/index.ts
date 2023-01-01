import app from './server';
import dotenv from 'dotenv';

// import all the env variables
dotenv.config();
const port = process.env.PORT || 5001;

app.listen(port, function server_start_callback() {
    console.log('server running ....');
});
