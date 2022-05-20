import type { NextPage } from "next";

import { Header } from "../layouts/Header";

const Home: NextPage = () => {

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-cyan-900">
          WELCOME TO KRYPTOHUB
        </h1>
      </div>
    </div>
  );
};

export default Home;
