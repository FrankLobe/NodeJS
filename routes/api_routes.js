import express from 'express';
import {
    getCertifications,
    getEducation,
    getEmployment,
    getExperience,
    getSkill,
    getHome
} from '../controllers/api_controllers.js';

const apiRouter = express.Router();

apiRouter.get('/certification', getCertifications);
apiRouter.get('/education', getEducation);
apiRouter.get('/employment', getEmployment);
apiRouter.get('/experience', getExperience);
apiRouter.get('/skill', getSkill);
apiRouter.get('/', getHome);

export default apiRouter;
