import Link from "next/link";

export default async function Home() {
  return (
    <div className="bg-amber-50 min-w-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
        to MonsterList
        <Link href={"/monsters"}>ここ！！</Link>
      </div>
    </div>
  );
}
