interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: string;
  placeholder: string;
}

export default function Input({ type = "text", placeholder, ...props }: Props) {
  return (
    <input
      type={type}
      className="bg-background outline-none border border-outline ring-0 rounded  p-sm w-full placeholder:text-foreground-secondary"
      placeholder={placeholder}
      {...props}
    />
  );
}
