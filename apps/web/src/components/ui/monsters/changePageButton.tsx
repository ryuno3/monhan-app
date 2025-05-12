import { Dispatch, SetStateAction } from "react";
import { Button } from "../button";

export default function ChangePageButton({
  activeTab,
  setActiveTab,
  tab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  tab: { id: string; label: string };
}) {
  return (
    <Button
      className={`${
        activeTab === tab.id
          ? "bg-blue-500 text-white hover:bg-blue-300"
          : "bg-gray-200 text-gray-800 hover:bg-gray-500"
      } `}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.label}
    </Button>
  );
}
