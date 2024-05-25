import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: string }) {
  return (
    <h1 className={cn("text-[2rem] text-center mt-[20vw]", className)}>
      Loading...
    </h1>
  );
}
