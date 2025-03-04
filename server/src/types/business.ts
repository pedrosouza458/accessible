import { ICategory } from "./category";
import { ILink } from "./links";

export interface IBusiness {
  id: string;
  name: string;
  logo?: string;
  email: string;
  password: string;
  description: string;
  city: string;
  phone: string;
  lat: string;
  long: string;
  pixText?: string;
  pixKey?: string;
  urgency: boolean;
  links: ILink[];
  createdAt: Date;
  updatedAt: Date;
  categories: ICategory[];
}
