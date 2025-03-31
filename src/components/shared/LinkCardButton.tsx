interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function LinkCardButton({ children, ...props }: Props) {
  return (
    <button
      type="button"
      className="rounded-full h-fit border border-outline px-sm py-xs text-xs hover:bg-popover transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
