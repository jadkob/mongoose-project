"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Error from "../Error";
import Loading from "../LoadingComp";

export default function Login() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          className="flex flex-col items-center justify-center w-full h-screen gap-[5vw]"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            axios
              .post("/api/login", {
                username: username.current?.value,
                password: password.current?.value,
              })
              .then((res) => {
                setCookie("token", res.data);
                router.push("/home");
              })
              .catch((err) => {
                setError(err.response.data);
              })
              .finally(() => setLoading(false));
          }}
        >
          {error && <Error error={error} />}
          <Input
            placeholder="Username"
            ref={username}
            className="w-fit px-[10vw] lg:w-full md:w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-fit px-[10vw] lg:w-full md:w-full"
            ref={password}
          />
          <Button>LogIn</Button>
        </form>
      )}
    </>
  );
}
