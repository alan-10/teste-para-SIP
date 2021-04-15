import Company from '../models/Company';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppErro from '../errors/AppErro';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateCompanyService {
  public async execute({ name, email, password }: Request): Promise<Company> {
    const companyRepository = getRepository(Company);

    const checkCompanyExists = await companyRepository.findOne({ where: { email } });

    if (checkCompanyExists) {
      throw new AppErro('email alread exists', 401)
    }

    const hashPassword = await hash(password, 8);

    const company = companyRepository.create({
      name,
      email,
      password: hashPassword,
      active: true
    });

    await companyRepository.save(company);
    return company;
  }
}

export default CreateCompanyService;
