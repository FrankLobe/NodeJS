import path from 'path';
import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import pageRoutes from './routes/page_routes.js';
import apiRoutes from './routes/api_routes.js';
import session from 'express-session';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const myResume = express();
myResume.use(bodyParser.json());
myResume.use(bodyParser.urlencoded({ extended: true }));
myResume.use(cookieParser());
myResume.use(session({secret: 'Frank_Lobe_My_Resume_Session_Secret', resave: false, saveUninitialized: false}));
myResume.use(csrf({ cookie: true }));
myResume.use(pageRoutes);
myResume.use('/api', apiRoutes);
myResume.use(express.static(path.join(__dirname, 'public')));
myResume.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
myResume.use(express.static(path.join(__dirname, 'node_modules/bootstrap-icons/')));
myResume.set('view engine', 'ejs');
myResume.listen(8000);
