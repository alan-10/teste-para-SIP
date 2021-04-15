import { response, Router } from 'express';

import AuthenticateCompanyService from '../services/AuthenticateCompayService';

const sessionRoutes = Router();

sessionRoutes.post('/company', async (request, response) => {
  try{
    const { email, password } = request.body;

  const authenticatCompay  = new AuthenticateCompanyService();

  const {  company, token } = await authenticatCompay.execute({ email, password});

  return response.json({company, token});
  }catch(err) {
    return response.status(401).json({ message: err.message});
  }
});


export { sessionRoutes }
