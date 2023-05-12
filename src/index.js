import express from 'express';
import morgan from 'morgan';
import router  from './routes/index.js';
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(router);


// starting the server
app.listen(app.get('port'), ()=> {
    console.log(`server on port ${app.get('port')}`);
 });