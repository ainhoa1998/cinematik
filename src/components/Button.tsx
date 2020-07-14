import React, { FC } from "react";

export const Button: FC<{
  color?: string;
  backgroundColor: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClick, children, color, backgroundColor }) => {
  return (
    <button
      style={{ color: color, backgroundColor: backgroundColor, padding: 5 }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
