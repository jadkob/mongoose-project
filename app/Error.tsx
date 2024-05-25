import { cn } from "@/lib/utils";

export default function Error({
  error,
  className,
}: {
  error: string;
  className?: string;
}) {
  return (
    <h1 className={cn("text-red-600 text-center text-[2rem]", className)}>
      {error}
    </h1>
  );
}
