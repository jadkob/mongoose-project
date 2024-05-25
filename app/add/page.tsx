"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Error from "../Error";
import Loading from "../LoadingComp";
import Nav from "../Nav";

export default function Signup() {
  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <Nav />
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
              .post(
                "/api/posts",
                {
                  title: title.current?.value,
                  text: text.current?.value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                alert("Added");
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
            placeholder="Title"
            ref={title}
            className="w-fit px-[10vw] lg:w-full md:w-full"
          />
          <Input
            placeholder="Text"
            className="w-fit px-[10vw] lg:w-full md:w-full"
            ref={text}
          />
          <Button>Add</Button>
        </form>
      )}
    </>
  );
}
