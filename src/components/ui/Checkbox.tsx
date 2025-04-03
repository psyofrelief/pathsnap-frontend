interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Checkbox({ name, ...props }: Props) {
  return (
    <input
      type="checkbox"
      name={name}
      className="rounded border-popover text-accent shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
      {...props}
    />
  );
}
