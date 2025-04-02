import Logo from "../shared/Logo";

export default function Loading() {
  return (
    <div className="fixed flex justify-center items-center inset-0  bg-background z-[99]">
      <Logo />
    </div>
  );
}
