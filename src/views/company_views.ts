import Company from '../models/Company';

interface Request {
  company: Company;
  token?: string;
}

export default {
  render({company, token }: Request){
    return {
      id: company.id,
      name: company.name,
      email: company.email,
      description: company.description,
      avatar: company.avatar,
      active: company.active,
      contact: company.contact,
      created_at: company.created_at,
      updated_at: company.update_at,
      token: token,
    }
  }
}
