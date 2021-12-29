// interfaces
export interface base {
  children: React.ReactNode,
}

export interface topic {
  quantity: number,
}

export interface image {
  src: string,
}

export interface modelInfo {
  name: string,
  quantity: number,
  description: string,
  specifications: string[],
  tags: string[],
}


export interface ModelCardPic {
  src: string,
  title: string,
  quantity: number,
  description: string
}


export interface MyRegisterFormValues {
  regFname: string,
  regLname:string,
  regEmail:string,
  regStatus:string,
  regNumber:string,
  regPass:string,
  repeatRegPass:string,
}

export interface MyLoginFormValues {
  loginEmail: string,
  loginPass:string,
}

export interface MySearchValues {
  query: string
}

export interface MyInputFormProps {
  text?: string, 
  type: string, 
  id: string, 
  name: string, 
  onChange?: any, 
  onBlur?: any, 
  value: string,
}

export interface MySingleSelectProps{
  id: string,
  name: string,
  onChange?: any, 
  onBlur?: any, 
  value: string,
}

export interface MyButtonProps {
  className?: string,
  text: string, 
  type: "button" | "submit" | "reset" | undefined, 
  name?: string, 
  onClick?: () => void,
}