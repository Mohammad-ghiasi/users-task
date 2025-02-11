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

//btn type
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean
}
