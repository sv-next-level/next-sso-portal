import Image from "next/image";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Image
        src="/next-js.svg"
        alt="Next Logo"
        className="dark:invert"
        width={50}
        height={50}
        priority
      />
      <h1 className="text-xl font-medium">{label}</h1>
    </div>
  );
};
