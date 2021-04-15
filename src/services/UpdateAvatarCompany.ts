import Company from '../models/Company';
import uploadConfig from '../config/upload';
import fs from 'fs';
import { join } from 'path'

import { getRepository } from 'typeorm';
import AppErro from '../errors/AppErro';

interface Request {
  company_id: string;
  filename: string;
}

class UpdateAvatarCompany {
  public async execute({ filename, company_id }: Request): Promise<Company> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne(company_id);

    if(!company){
      throw new AppErro('Onlyauthenticated user can avatar', 401)
    }

    if(company.avatar){

      const companyAvatarFilePath = join(uploadConfig.directory, company.avatar);
      const companyAvatarFileExists = await  fs.promises.stat(companyAvatarFilePath);

      if(companyAvatarFileExists){
        await fs.promises.unlink(companyAvatarFilePath);
      }
    }

    company.avatar = filename;
    await companyRepository.save(company);

    return company;

  }
}

export default UpdateAvatarCompany;
