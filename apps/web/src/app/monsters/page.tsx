import ClientMonsterPageContent from "@/components/layout/monsters/clientMonsterPageContainer";
import { LoadingFallback } from "@/components/ui/monsters/loadingFallback";
import { Suspense } from "react";

export default function MonsterPage() {
  return (
    <div className="bg-amber-50 min-w-screen flex flex-col justify-start items-center pt-8 pb-16">
      {" "}
      <div className="w-full max-w-6xl px-4">
        {" "}
        <Suspense fallback={<LoadingFallback message="モンスターデータを取得しています..." />}>
          <ClientMonsterPageContent />
        </Suspense>
      </div>
    </div>
  );
}
