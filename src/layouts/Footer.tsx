import {
  FacebookRounded,
  GitHub,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#1e2228] max-h-screen">
      <div className="container text-[#cacaca] pt-16 pb-10 text-center mx-auto leading-6">
        <div className="flex flex-wrap justify-center mb-10">
          <div className="w-10/12">
            <div className="flex flex-wrap md:flex-row flex-col justify-center">
              <div className="md:w-1/3 md:mb-0 mb-6">
                <div className="">
                  <h3 className="text-white text-xl mb-3 font-semibold">
                    Location
                  </h3>
                  <address className="mb-0 font-jost">
                    {" "}
                    5th Floor, A2 Ecolife Building, 58 To Huu St.,
                    <br /> Nam Tu Liem Dist., Hanoi, Vietnam.
                  </address>
                </div>
              </div>

              <div className="md:w-1/3 md:mb-0 mb-6">
                <div className="">
                  <h3 className="text-white text-xl mb-3 font-semibold">
                    Follow
                  </h3>
                  <ul className="flex justify-between max-w-[250px] mx-auto">
                    <li>
                      <a href="#">
                        <GitHub />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FacebookRounded />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Twitter />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Instagram />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:w-1/3 md:mb-0 mb-6">
                <div className="">
                  <h3 className="text-white text-xl mb-3 font-semibold">
                    Contact
                  </h3>
                  <a href="mailto:#" className="nocolor font-jost">
                    info@kryptohub.co
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space30"></div>
        <p className="text-center font-jost">
          © 2022 Kryptohub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
