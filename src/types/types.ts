export interface IItem {
  id?: string | number
  src: string
  title?: string
  description: string
  price?: null | number
}

export interface IInput {
  name: string;
  title?: string;
  placeholder?: string;
  control: any;
  readOnly?: boolean;
  required?: boolean;
  type?: string
}