import { response, Router } from 'express';
import companyView from '../views/company_views';

import AuthenticateCompanyService from '../services/AuthenticateCompayService';

const sessionRoutes = Router();

sessionRoutes.post('/company', async (request, response) => {

    const { email, password } = request.body;

  const authenticatCompay  = new AuthenticateCompanyService();

  const {  company, token } = await authenticatCompay.execute({ email, password});

  return response.json(companyView.render({company, token}));

});


export { sessionRoutes }
