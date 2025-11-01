"use client"
import { Navbar } from "@/components/admin-panel/navbar";
import { Card, CardContent } from "../ui/card";
import { usePathname } from "next/navigation";
import { getMenuByPathName } from "@/lib/menu-list";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  const pathname = usePathname()
  const currentMenuItem = getMenuByPathName(pathname)

  return (
    <div className="h-full w-full flex flex-col">
      <Navbar title={currentMenuItem?.label || ""} />
      <div className="border-box bg-secondary p-8 h-full w-full">
        {children}
      </div>
    </div>
  );
}
