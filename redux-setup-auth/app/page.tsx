import { useRouter } from "next/router";
import React from "react";

const page = () => {
  const router = useRouter();

  router.push("/login");

  return <div>page</div>;
};

export default page;
