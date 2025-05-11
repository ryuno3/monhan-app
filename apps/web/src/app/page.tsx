import MonsterList from "@/components/layout/monsters/monster_list";

export type Monster = {
  monster_id: string;
  name: string;
  another_name: string;
  category: string;
  title: string[];
  image_url: string;
  ranking: {
    ranking: number;
    vote_year: string;
  }[];
};

type MonstersResponse = {
  total: number;
  monsters: Monster[];
};

export default async function Home() {
  const res = await fetch("https://api.mh-api.com/v1/monsters?limit=100");
  const data: MonstersResponse = await res.json();
  if (!data) {
    return <div>Loading...</div>;
  }
  const count = data.total;

  return (
    <div className="bg-amber-50 min-w-screen flex flex-col">
      <div className="relative text-center ">
        <h1 className="text-3xl font-bold mb-4">モンスター一覧</h1>
        <p className="text-gray-700 mb-4">モンスターの数: {count}</p>
        <div className="flex justify-center">
          <MonsterList monsters={data.monsters} />
        </div>
      </div>
    </div>
  );
}
