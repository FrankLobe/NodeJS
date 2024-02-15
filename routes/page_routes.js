import express from 'express';
import bodyParser from 'body-parser';
import {
    getCertifications, 
    getContact, 
    postContact,
    getCoverLetter,
    getEducation,
    getEmployment,
    getError,
    getExperience,
    getHome,
    getSkill
} from '../controllers/page_controllers.js';

const pageRouter = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

pageRouter.get('/certification', getCertifications);
pageRouter.get('/contact', getContact);
pageRouter.post('/contact', urlEncodedParser, postContact);
pageRouter.get('/coverletter', getCoverLetter);
pageRouter.get('/education', getEducation);
pageRouter.get('/employment', getEmployment);
pageRouter.get('/error', getError);
pageRouter.get('/experience', getExperience);
pageRouter.get('/home', getHome);
pageRouter.get('/skill', getSkill);
pageRouter.get('/', getHome);

export default pageRouter;