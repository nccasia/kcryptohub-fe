export const Footer = () => {
  return (
    <footer
      className="w-full bg-primary relative 
      sm:before:w-full before:w-0 before:h-[1px] before:bg-cyan-600 before:absolute lg:before:mt-3 lg:before:top-1/4 sm:before:top-1/2 before:top-1/3"
    >
      <div className="flex items-center justify-center w-full h-full 
      sm:before:w-0 before:absolute before:w-full before:bg-cyan-600 before:h-[1px] before:top-14 before:left-0 ">
        <div className=" grid w-full 2xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 text-white container-xl h-full pl-8">
          <div className="px-4 relative h-full min-h-fit 
          sm:before:w-[1px] sm:before:h-full sm:before:absolute sm:before:right-[-5px] sm:before:bg-cyan-600 
          after:absolute after:bg-cyan-600 after:w-[1px] after:h-16 after:left-0 after:top-5 sm:after:w-0">
            <div className="sm:mt-[17%] sm:mb-6 my-4 ">
              <h1 className="xl:text-3xl text-2xl">KryptoHub</h1>
            </div>
            <ul className="text-xs hidden  sm:flex flex-col justify-around sm:h-1/3  h-full w-full">
              <li>&copy; 2022 Kryptohub</li>
              <li>
                <a href="https://kryptohub.co/terms">Terms of Service</a>
              </li>
              <li>
                <a href="https://kryptohub.co/privacy">Privacy</a>
              </li>
              <li>
                We updated our Terms of Service
                <br />
                on August 9, 2021.
              </li>
            </ul>
          </div>
          <div className="px-4 relative mt-5 sm:mt-0 mb-16 
          sm:before:w-[1px] sm:before:h-3/4 sm:before:absolute sm:before:right-[-5px] sm:before:top-[20%] sm:before:mt-4 sm:before:bg-cyan-600 before:w-0 
          after:absolute after:w-[1px] after:bg-cyan-600 after:h-full after:-bottom-48 after:left-0 sm:after:w-0 ">
            <div className="sm:mt-[20%] sm:mb-6 text-gray-400 my-2">
              <h1 className="xl:text-2xl text-lg">About Kryptohub</h1>
            </div>
            <ul className="flex flex-col justify-around sm:h-1/2 w-full h-full lg:text-md xl:text-lg font-semibold">
              <li className="hover:underline">
                <a href="https://kryptohub.co/about-us" title="Our Story">
                  Our Story
                </a>
              </li>
              <li className="hover:underline">
                <a href="https://kryptohub.co/careers" title="Careers">
                  Careers
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/press-releases"
                  title="News & Press Releases"
                >
                  News & Press Releases
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/methodology"
                  title="Research Methodology"
                >
                  Research Methodology
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 relative mb-16 sm:before:mt-4 sm:before:w-[1px] sm:before:h-3/4 sm:before:absolute sm:before:right-[-5px] sm:before:top-[20%] sm:before:bg-cyan-600 before:w-0 after:absolute after:w-full after:bg-cyan-600 after:h-[1px] after:top-0 after:-left-4 sm:after:w-0">
            <div className="sm:mt-[20%] sm:mb-6 text-gray-400">
              <h1 className="xl:text-2xl text-lg">Buyers</h1>
            </div>
            <ul className="flex flex-col justify-around sm:h-3/4 w-full h-full lg:text-md xl:text-lg font-semibold">
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/sitemap"
                  title="Browse All Directories"
                >
                  Browse All Directories
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/review"
                  title="Review Service Providers"
                >
                  Review Service Providers
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/review/review-to-donate"
                  title="Review to Donate"
                >
                  Review to Donate
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/resources"
                  title="Blog & Industry Surveys"
                >
                  Blog & Industry Surveys
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/your-project"
                  title="Concierge Service"
                >
                  Concierge Service
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://help.kryptohub.co/knowledge/for-buyers"
                  title="Buyer FAQs"
                >
                  Buyer FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 relative mb-16 before:mt-4 sm:before:w-[1px] sm:before:h-3/4 sm:before:absolute sm:before:right-[-5px] sm:before:top-[20%] sm:before:bg-cyan-600 before:w-0 ">
            <div className="sm:mt-[20%] sm:mb-6 my-2 text-gray-400">
              <h1 className="text-lg xl:text-2xl ">Service Providers</h1>
            </div>
            <ul className="flex flex-col justify-around sm:h-3/4 h-full w-full lg:text-md xl:text-lg font-semibold">
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/service-providers"
                  title="Service Provider Guide"
                >
                  Service Provider Guide
                </a>
              </li>
              <li className="hover:underline">
                <a href="https://kryptohub.co/get-listed" title="Get Listed">
                  Get Listed
                </a>
              </li>
              <li className="hover:underline">
                <a href="https://kryptohub.co/sponsorship" title="Sponsorship">
                  Sponsorship
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://kryptohub.co/service-providers/marketing"
                  title="Marketing Opportunities"
                >
                  Marketing Opportunities
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://help.kryptohub.co/knowledge/for-service-providers"
                  title="Service Provider FAQs"
                >
                  Service Provider FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 relative mb-16 4 row-start-2 md:row-start-auto ">
            <div className="sm:mt-[20%] sm:mb-6 my-2 text-gray-400">
              <h1 className="text-lg xl:text-2xl ">Contact</h1>
            </div>
            <ul className="flex flex-col justify-around sm:h-1/3 w-full h-full text-sm lg:mt-10 mt-0 font-semibold">
              <li>
                <a
                  href="https://help.kryptohub.co/contact-us"
                  title="Contact Us"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://surveys.hotjar.com/s?siteId=197386&surveyId=136158"
                  title="Site Feedback"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  Site Feedback
                </a>
              </li>
              <li className="text-[#c9dfe6]">
                1800 Massachusetts Ave. NW,
                <br />
                Suite 200
                <br />
                Washington DC 20036
              </li>
            </ul>
          </div>
          <div className="block py-4 before:absolute  sm:hidden">
            <ul className="text-xs text-white flex flex-col justify-around sm:h-1/3  h-full w-full before:w-full before:bg-cyan-600 before:h-[1px] before:bottom-24 before:right-0 before:-left-10">
              <div className="flex py-4 mx-auto w-full items-center">
                <li className="mx-3 w-full">&copy; 2022 Kryptohub</li>
                <li className="mx-3 w-full">
                  <a href="https://kryptohub.co/terms">Terms of Service</a>
                </li>
                <li className="mx-3 w-full">
                  <a href="https://kryptohub.co/privacy">Privacy</a>
                </li>
              </div>
              <span className="w-full text-center">
                We updated our Terms of Service
                <br />
                on August 9, 2021.
              </span>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
