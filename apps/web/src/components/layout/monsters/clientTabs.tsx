"use client";

import { MonsterListProps } from "@/types/monsters/type";
import { useState } from "react";
import MonsterList from "./monster_list";
import ChangePageButton from "@/components/ui/monsters/changePageButton";

export default function ClientTabs({ monsters }: { monsters: MonsterListProps }) {
  const tabs = [
    { id: "page1", label: "1" },
    { id: "page2", label: "2" },
    { id: "page3", label: "3" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">モンスター一覧</h1>
      <p className="text-gray-700 mb-4">モンスターの数: {monsters.total}</p>
      <p>いまのタブは{activeTab}です</p>
      <ul className="grid grid-cols-3 gap-4 mt-4">
        {tabs.map((tab) => (
          <li key={tab.id} className="">
            <ChangePageButton activeTab={activeTab} setActiveTab={setActiveTab} tab={tab} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <MonsterList monsters={monsters.monsters} />
      </div>
    </div>
  );
}
