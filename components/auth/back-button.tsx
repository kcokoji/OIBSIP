"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  title?: string;
}

export const BackButton = ({ href, label, title }: BackButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <p>{title}</p>
      <Link href={href} className="text-primary underline font-medium">
        {label}
      </Link>
    </div>
  );
};
