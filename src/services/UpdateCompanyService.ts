import Company from '../models/Company';
import { getRepository } from 'typeorm';
import AppErro from '../errors/AppErro';

interface Request {
  name: string;
  description: string;
  contact: string;
  id: string;
}

// o email o dev vai alterar por enquanto
class UpdateCompanyService {
  public async execute({
    name,
    description,
    contact,
    id,
  }: Request): Promise<Company> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne(id);

    if (!company) {
      throw new AppErro('company not exists', 401);
    }

    company.name = name;
    company.description = description;
    company.contact = contact;

    await companyRepository.save(company);
    return company;
  }
}

export default UpdateCompanyService;
