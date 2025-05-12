"use server";

import { MonsterListProps } from "@/types/monsters/type";
import { ITEMS_PAR_PAGE } from "@/utils/monsters/constants";

export async function fetchMonsters(currentPage: number): Promise<MonsterListProps> {
  const startIndex = (currentPage - 1) * ITEMS_PAR_PAGE;

  try {
    const res = await fetch(`https://api.mh-api.com/v1/monsters`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: MonsterListProps = await res.json();
    if (!data) {
      throw new Error("No data found");
    }
    const responseData = {
      monsters: [...data.monsters].slice(startIndex, startIndex + ITEMS_PAR_PAGE),
      total: data.total,
    };
    return responseData;
  } catch (e) {
    console.error("Error fetching monsters:", e);
    return { total: 0, monsters: [] };
  }
}
