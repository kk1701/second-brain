import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="h-screen w-76 bg-white border-r fixed top-0 left-0 p-8 flex flex-col items-center gap-12">
      <div className="text-4xl text-purple-600 font-bold flex gap-8 justify-center items-center">
        <BrainIcon size="xlg" />
        <span>Brainly</span>
      </div>

      <div className="w-full flex flex-col items-center gap-3 text-xl">
        <SidebarItem icon={<TwitterIcon size="lg" />} text="Tweets" />
        <SidebarItem icon={<YoutubeIcon size="lg" />} text="Videos" />
      </div>
    </div>
  );
}
