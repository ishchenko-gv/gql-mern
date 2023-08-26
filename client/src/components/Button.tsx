import { ReactNode } from "react";

type Props = {
  text: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  fluid?: boolean;
  onClick: () => void;
};

export default function Button(props: Props) {
  const { text, isLoading, isDisabled = false, fluid = false, onClick } = props;

  return (
    <span className="relative">
      <button
        className={`btn ${isLoading ? "text-slate-700" : ""} ${
          fluid ? "w-full" : ""
        }`}
        disabled={isDisabled}
        onClick={onClick}
      >
        {text}
      </button>
      {isLoading && (
        <span className="loading loading-dots loading-md absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </span>
  );
}
