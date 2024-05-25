"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-[5vw] items-center justify-center w-full h-screen">
      <Button asChild>
        <Link href={"/login"}>LogIn</Link>
      </Button>
      <Button asChild>
        <Link href={"/signup"}>SignUp</Link>
      </Button>
    </div>
  );
}
