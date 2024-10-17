import * as urso from '@urso/core';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <urso.ui.Button onClick={onClick} x={100} y={400}>
      <urso.text.Text>{text}</urso.text.Text>
    </urso.ui.Button>
  );
};