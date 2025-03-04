export interface ILink {
  id: string;
  url: string;
  title: string;
}

export interface IBusiness {
  id: string;
  name: string;
  logo?: string;
  email: string;
  password: string;
  description: string;
  city: string;
  phone: string;
  position?: string;
  pixText?: string;
  pixKey?: string;
  urgency: boolean;
  links: ILink[];
  createdAt: Date;
}

export interface BusinessPageProps {
  params: { id: string };
}
