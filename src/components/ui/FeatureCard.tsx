interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon, title, desc }: Feature) {
  return (
    <li className="flex flex-col  bg-popover rounded p-md  gap-md borde border-outline">
      {icon}
      <header>
        <p className="font-semibold">{title}</p>
        <p className="text-foreground-secondary">{desc}</p>
      </header>
    </li>
  );
}
