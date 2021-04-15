import Company from '../models/Company';
import { getRepository } from 'typeorm';
import AppErro from '../errors/AppErro';

class DeliteCompanyService {
  public async execute(id: string) {
    const companyRepository = getRepository(Company);

    const companyExists = await companyRepository.findOne({ where: { id } });

    if (!companyExists) {
      throw new AppErro('company not Exists');
    }
    companyRepository.delete(id);
    return { deleted: true};
  }
}

export default DeliteCompanyService;
