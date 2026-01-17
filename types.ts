
export enum FunnelStep {
  TERMS = 'TERMS',
  REGISTER = 'REGISTER',
  WHEEL = 'WHEEL',
  RESULT = 'RESULT'
}

export interface FormData {
  name: string;
  cpf: string;
  cnpj: string;
  company: string;
  job: string;
  area: string;
}

export interface Prize {
  id: string;
  label: string;
  icon: string;
  description: string;
  image: string;
}
