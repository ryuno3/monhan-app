import { Monster } from "@/app/page";
import Image from "next/image";

export default function MonsterList({ monsters }: { monsters: Monster[] }): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 m-4">
      {monsters.map((monster) => (
        <div key={monster.monster_id} className="bg-white shadow-md rounded-lg p-4 m-4">
          <Image
            src={monster.image_url}
            alt={monster.name}
            width={300}
            height={300}
            priority
            className="w-full h-auto rounded-lg mb-2"
          />
          <h2 className="text-xl font-semibold">{monster.name}</h2>
          <p className="text-gray-600">{monster.category}</p>
        </div>
      ))}
    </div>
  );
}
