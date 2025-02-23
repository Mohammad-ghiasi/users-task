import clsx from "clsx";
import { InputFieldProps } from "@/types/myTypes";



const InputField = ({
  placeholder = "Enter text...",
  icon,
  register,
  error,
  type = "text",
  className,
}: InputFieldProps) => {
  return (
    <div>
      <div className="flex flex-col justify-center relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className={clsx(
            `border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 shadow transition ${className}`,
            {
              "border-red-500 focus:ring-red-500": error,
              "focus:ring-green-500": !error,
              "pl-10": icon,
            }
          )}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
