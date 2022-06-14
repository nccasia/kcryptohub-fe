import { Layout } from "@/src/layouts/layout";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="mx-2 my-6">
        <div className="min-h-[500px] p-10 mx-auto md:max-w-[555px] lg:max-w-[655px] xl:max-w-[755px] shadow-xl shadow-[#CAE0E7] border border-[#CAE0E7]">
          <h3 className="text-[#6A797D] mb-3 uppercase font-normal">
            404 - Page not found
          </h3>
          <div className="flex gap-x-5 items-center mb-5">
            <h1 className="text-primary text-2xl md:text-5xl font-bold">
              This page gets
            </h1>
            <div className="flex">
              <svg
                viewBox="0 0 33 31"
                fill="url(#haflStar)"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#FF3D2D] w-4 h-4 md:w-8 md:h-8"
              >
                <path d="M16.5 24.991L8.38497 29.8103C7.39571 30.3987 6.17415 29.529 6.43778 28.4264L8.58856 19.3941L1.44974 13.306C0.580551 12.5642 1.04777 11.1624 2.19625 11.0652L11.6059 10.2824L15.2993 1.777C15.7483 0.741001 17.2517 0.741001 17.7007 1.777L21.3941 10.2824L30.8038 11.0652C31.9522 11.1624 32.4194 12.5642 31.5503 13.306L24.4114 19.3941L26.5622 28.4264C26.8258 29.529 25.6043 30.3987 24.615 29.8103L16.5 24.991Z" />
                <defs>
                  <linearGradient id="haflStar">
                    <stop offset="50%" style={{ stopColor: "#FF3D2D" }} />
                    <stop offset="50%" style={{ stopColor: "#FFFFFF" }} />
                  </linearGradient>
                </defs>
              </svg>
              {[1, 2, 3, 4].map((item, index) => (
                <svg
                  key={index}
                  viewBox="0 0 33 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#FF3D2D] w-4 h-4 md:w-8 md:h-8"
                >
                  <path d="M16.5 24.991L8.38497 29.8103C7.39571 30.3987 6.17415 29.529 6.43778 28.4264L8.58856 19.3941L1.44974 13.306C0.580551 12.5642 1.04777 11.1624 2.19625 11.0652L11.6059 10.2824L15.2993 1.777C15.7483 0.741001 17.2517 0.741001 17.7007 1.777L21.3941 10.2824L30.8038 11.0652C31.9522 11.1624 32.4194 12.5642 31.5503 13.306L24.4114 19.3941L26.5622 28.4264C26.8258 29.529 25.6043 30.3987 24.615 29.8103L16.5 24.991Z" />
                </svg>
              ))}
            </div>
          </div>
          <div>
            <p className="text-primary text-xl md:text-3xl">
              A rare Kryptohub page that has 0 value.
            </p>
            <p className="text-primary text-xl md:text-3xl">
              So sorry you had to see this!
            </p>
            <p className="text-xl mt-14">
              <Link href="/">
                <a className="text-[#3e839e] font-medium">Home page</a>
              </Link>{" "}
              would be much more helpful!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
