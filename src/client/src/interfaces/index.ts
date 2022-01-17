import { GridColDef } from "@mui/x-data-grid";
import { GridCellParams, MuiEvent } from "@mui/x-data-grid";

// interfaces
export interface base {
  children: React.ReactNode,
}

export interface topic {
  quantity: number,
}
export interface TopicDevice {
  title:string,
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
  description: string,
  id: string
}

export interface DeviceCardParams {
  availability: string,
  deviceId: string,
  className?: string,
  children?: React.ReactNode,
  onClick?: () => void,
}

export interface ModelCardData {
  name: string;
  quantity: number;
  description: string;
  id: string;
}
export interface ModelDeviceData {
  id: string;
  userId: string | null;
}


export interface MyRegisterFormValues {
  regFname: string,
  regLname:string,
  regEmail:string,
  regStatus:number,
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
  value: number,
}

export interface MyButtonProps {
  className?: string,
  text: string, 
  type: "button" | "submit" | "reset" | undefined, 
  name?: string, 
  onClick?: () => void,
}

interface SubMenu {
  name: string,
  icon: any,
  url: string
}
export interface MenuItemProps {
  title: string;
  icon: any;
  submenu: SubMenu[];
}

export interface WidgetProps {
  title: string;
  total: number;
  changed: number;
}

export interface FeaturedInfoProps {
  totalUsers: number;
  totalModels: number;
  totalDevices: number;
  differenceLastMonthUsers: number;
  differenceLastMonthModels: number;
  differenceLastMonthDevices: number;
}

export interface ReservationItem {
  month: any,
  count: number
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: number
  profession: number
  created_on: number
}

export interface UserById extends User {
  reservations:any[]
}

export interface TableProps {
  columns: GridColDef[]
  // data: User[]
  data: any
  onCellClick?: any
  total?: number
  page?: any
  setPage?: any
}

export interface WidgetListItemProps {
  name: string
  time?: number
  type: string,
  firstName?: string
  lastName?: string
  start?: number
  end?: number
}

export interface HeaderProps {
  type?: string
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export enum UserRole {
  Regular,
  Admin,
  SuperAdmin,
}

export interface TokenInfo {
  email: string,
  exp: number,
  iat: number,
  role: UserRole,
  sub: string
}

export interface EditProfileValues {
  editFname: string,
  editLname:string,
  editEmail:string,
  editPass:string,
  repeatEditPass:string,
}
export interface FilterValues {
  filterName: string,
  filterSelect: any[];

}
export interface FilterParams {
  name: string,
  onChange: (value: any) => void,
  value: any
}