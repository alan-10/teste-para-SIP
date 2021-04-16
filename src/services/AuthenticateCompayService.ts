import Company from '../models/Company';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppErro from '../errors/AppErro';


interface Request {
  email: string;
  password: string;
}

interface Response {
  company: Company;
  token: string;
}

class AuthenticateCompanyService {
  public async execute({ email, password }: Request): Promise<Response> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({ where: { email } });

    if (!company) {
      throw new AppErro('Incorrect email/password combination', 401);
    }

    const checkedPassword = await compare(password, company.password);

    if (!checkedPassword) {
      throw new AppErro('Incorrect email/password combination', 401);
    }

    const { secret } = authConfig.jwt;

    const token = sign({}, secret, { subject: company.id });

    return { company, token };
  }
}

export default AuthenticateCompanyService;
