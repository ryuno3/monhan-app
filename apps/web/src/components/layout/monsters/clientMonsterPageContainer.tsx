"use client";

import { fetchMonsters } from "@/server/actions/monsters/fetchMonsters";
import { Monster } from "@/types/monsters/type"; // 型定義のインポート
import { ITEMS_PAR_PAGE } from "@/utils/monsters/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MonsterList from "./monster_list"; // MonsterListをインポート
import Pagination from "@/components/ui/monsters/pagenation"; // Paginationをインポート
import { LoadingFallback } from "@/components/ui/monsters/loadingFallback"; // ローディングフォールバックをインポート

export default function ClientMonsterPageContent() {
  const searchParams = useSearchParams(); // searchParamsに修正
  const currentPage = Number(searchParams.get("page")) || 1;

  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMonsters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMonsters(currentPage); // Server Actionを呼び出し
        setMonsters(data.monsters);
        setTotalPages(Math.ceil(data.total / ITEMS_PAR_PAGE));
      } catch (e) {
        console.error("Failed to fetch monsters:", e);
        setError("モンスターデータの読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    loadMonsters();
  }, [currentPage]); // currentPageが変更されたら再実行

  if (isLoading) {
    return <LoadingFallback message="モンスターデータを読み込み中..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-red-600">
        <p className="text-xl font-semibold">エラー</p>
        <p>{error}</p>
      </div>
    );
  }

  if (monsters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-amber-700">
        <p className="text-xl">該当するモンスターは見つかりませんでした。</p>
        {/* データがなくても、総ページ数が計算されていればページネーションを表示することも検討可能 */}
        {totalPages > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/monsters" />
        )}
      </div>
    );
  }

  return (
    <>
      <MonsterList monsters={monsters} />
      {totalPages > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/monsters" />
      )}
    </>
  );
}
