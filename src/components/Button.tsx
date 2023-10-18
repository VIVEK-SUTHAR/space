import { HTMLProps } from "react";

type Props = {
  title: string;
} & HTMLProps<HTMLButtonElement>;

const Button = (props: Props) => {
  return (
    <button
      className={`inline-block py-2 w-full px-6 mb-2 text-xs text-center font-semibold leading-6 text-black bg-transparent hover:bg-gray-950 border-black border-[1px] hover:text-white  rounded-md transition duration-200 ${props?.className}`}
      onClick={props.onClick ? props.onClick : () => {}}
    >
      {props.title}
    </button>
  );
};

export default Button;
