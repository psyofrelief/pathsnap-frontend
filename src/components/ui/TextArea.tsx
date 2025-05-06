interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: string;
  placeholder: string;
}

export default function TextArea({ placeholder, ...props }: Props) {
  return (
    <textarea
      className="bg-background flex-1 min-h-[200px] outline-none border border-outline ring-0 rounded  p-sm w-full placeholder:text-foreground-secondary"
      placeholder={placeholder}
      {...props}
    />
  );
}
