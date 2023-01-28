import { type NextPage } from "next";
// Import React dependencies.
import React, { useState } from "react";
// Import the Slate editor factory.
import type { Descendant } from "slate";

import dynamic from "next/dynamic";

const TobokaEditor = dynamic(
  () => import("../components/TobokaEditor/TobokaEditor"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  return <TobokaEditor value={value} setValue={setValue} />;
};

export default Home;
