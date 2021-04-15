import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateCompanyService from '../services/CreateCompanyService';
import UpdateAvatarCompany from '../services/UpdateAvatarCompany';
import DeliteCompanyService from '../services/DeliteCompanyService';
import UpdateCompanyService from '../services/UpdateCompanyService';

import AppErro from '../errors/AppErro';

const companyRoutes = Router();

const upload = multer(uploadConfig);

companyRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createCompany = new CreateCompanyService();

  const company = await createCompany.execute({ name, email, password });

  return response.json(company);
});

companyRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateAvatarCompany();

      const company = await updateAvatar.execute({
        filename: request.file.filename,
        company_id: request.user.id,
      });

      return response.json(company);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

companyRoutes.put('/update',ensureAuthenticated, async (request, response) => {
  const { name, description, contact } = request.body;

  const updatecompany = new UpdateCompanyService();
  const company = await updatecompany.execute({
    name,
    description,
    contact,
    id: request.user.id,
  });

  return response.json(company);
});

companyRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deletecompany = new DeliteCompanyService();

  const deleted = await deletecompany.execute(id);
  return response.json(deleted);
});

export { companyRoutes };
