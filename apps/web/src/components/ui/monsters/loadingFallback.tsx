// モンスターデータ取得
export function LoadingFallback({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-amber-700">
      <p className="text-xl">{message}</p>
      {/* ここにスピナーなどのローディングアニメーションを配置できます */}
    </div>
  );
}
