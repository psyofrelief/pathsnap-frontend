interface Props {
  children: React.ReactNode;
  htmlFor: string;
}
export default function Label({ children, htmlFor }: Props) {
  return (
    <label className="text-xs font-medium" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
