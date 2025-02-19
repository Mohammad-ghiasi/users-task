import { UseFormRegisterReturn } from "react-hook-form";
import { ToastOptions } from "react-toastify";

//react query types
export type reactQueryTypeProp = { children: React.ReactNode };

// toast type
export type ToastStatus = "success" | "error" | "warning" | "info";
export interface CustomToast {
  status: ToastStatus;
  title: string;
  options?: ToastOptions;
}

// Define the form data type
export interface ILoginForm {
  email: string;
  password: string;
}

// param types for dynamic routing
export type propParams = { params: { userid: string }; searchParams: {} };

// finall users
export interface UserResponse {
  users: User[];
  pagination: Pagination;
}

// pagination info
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  pageSize: number;
}

// users type
export type User = {
  _id: string;
  password: string;
  job: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// prop type for redirecting (optional)
export type addUserProp = {
  redirect?: string;
};
// sigup form input type
export interface ISignupForm {
  email: string;
  password: string;
  job: string;
  firstname: string;
  lastname: string;
}

// edite modal props type
export interface EditModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

// UI types

export interface Address {
  _id: string;
  addressName: string;
  address: string;
}

export interface AddressItemProps {
  address: Address;
  isOwn: boolean;
  deleteAddress: (id: string) => void; // مشخص کردن تایپ ورودی
}

export interface EditAddressProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address;
}

export interface AddressItemProps {
  address: Address;
  isOwn: boolean;
  deleteAddress: (id: string) => void; // مشخص کردن تایپ ورودی
}

//btn type
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

// input types 
export interface InputFieldProps {
  placeholder?: string;
  icon?: JSX.Element;
  register: UseFormRegisterReturn;
  error?: string;
  type?: string;
  className?: string;
};

// map Types
export type locationFormType = {
  addressName: string;
  address: string
};
export type locationPositionType = [number, number];
