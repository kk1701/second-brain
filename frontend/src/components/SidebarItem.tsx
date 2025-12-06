import type { ReactElement } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
}

export function SidebarItem(props: SidebarItemProps) {
  return (
    <div className="flex justify-around w-[100%] cursor-pointer text-gray-700 hover:bg-gray-200 px-2 py-1 rounded-md">
      {props.icon} {props.text}
    </div>
  );
}
