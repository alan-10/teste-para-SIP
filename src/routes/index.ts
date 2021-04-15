import { Router } from 'express';
import { companyRoutes } from './company.routes';
import { sessionRoutes } from './sessions.routes';

const routes = Router();

routes.use('/company', companyRoutes);
routes.use('/sessions', sessionRoutes);


export default routes
