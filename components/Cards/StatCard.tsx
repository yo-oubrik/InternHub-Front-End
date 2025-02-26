import Image from "next/image";

type StatCardProps = {
  count?: number;
  label: string;
  icon: string;
  alt?: string;
};

export const StatCard = ({
  count,
  label,
  icon,
  alt = "icon",
}: StatCardProps) => {
  return (
    <div
      className={
        "flex flex-1 flex-col gap-6 rounded-lg bg-cover p-6 shadow-md bg-white"
      }
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={60}
          width={60}
          alt={alt}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-black">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};
