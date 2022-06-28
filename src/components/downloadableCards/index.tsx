import { CaretRight } from "phosphor-react";

interface CardProps {
  href: string;
  title: string;
  subtitle: string;
  type: React.ReactNode;
}

export const DownloadableCards = ({ href, title, subtitle, type }: CardProps) => {
  return (
    <a href={href} className="bg-gray-700 rounded overflow-hidden flex items-stretch justify-between gap-6 hover:brightness-75 duration-300 ease-in-out">
      <div className="bg-green-700 h-full p-6 flex items-center">
        {type}
      </div>
      <div className="py-6 leading-relaxed flex flex-col w-full">
        <strong className="text-2xl">{title}</strong>
        <p className="text-sm text-gray-200 mt-2">{subtitle}</p>
      </div>
      <div className="h-full p-6 flex items-center">
        <CaretRight />
      </div>
    </a>
  )
}