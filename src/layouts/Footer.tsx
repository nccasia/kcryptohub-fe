export const Footer = () => {
  return (
    <footer
      className="w-full bg-primary relative 
      before:w-full before:h-[1px] before:bg-cyan-600 before:absolute lg:before:top-1/4 sm:before:top-1/2 before:top-1/3"
    >
      <div className="flex items-center justify-center h-full">
        <div className=" grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-x-4 text-white container-xl h-full pl-8">
          <div className="relative h-full min-h-fit before:w-[1px] before:h-full before:absolute before:right-[-5px] before:bg-cyan-600">
            <div className="mt-[17%] mb-6">
              <h1 className="xl:text-3xl text-xl">KryptoHub</h1>
            </div>
            <ul className="text-xs flex flex-col justify-around h-1/3">
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
          <div className="px-4 relative mb-16 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-[20%] before:mt-4 before:bg-cyan-600 ">
            <div className="mt-[20%] mb-6 text-gray-400">
              <h1 className="xl:text-2xl text-lg">About Kryptohub</h1>
            </div>
            <ul className="flex flex-col justify-around h-1/2 lg:text-md xl:text-lg font-semibold">
              <li>
                <a href="https://kryptohub.co/about-us" title="Our Story">
                  Our Story
                </a>
              </li>
              <li>
                <a href="https://kryptohub.co/careers" title="Careers">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://kryptohub.co/press-releases"
                  title="News & Press Releases"
                >
                  News & Press Releases
                </a>
              </li>
              <li>
                <a
                  href="https://kryptohub.co/methodology"
                  title="Research Methodology"
                >
                  Research Methodology
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 relative mb-16 before:mt-4 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-[20%] before:bg-cyan-600 ">
            <div className="mt-[20%] mb-6 text-gray-400">
              <h1 className="xl:text-2xl text-lg">Buyers</h1>
            </div>
            <ul className="flex flex-col justify-around h-3/4 lg:text-md xl:text-lg font-semibold">
              <li>
                <a
                  href="https://kryptohub.co/sitemap"
                  title="Browse All Directories"
                >
                  Browse All Directories
                </a>
              </li>
              <li>
                <a
                  href="https://kryptohub.co/review"
                  title="Review Service Providers"
                >
                  Review Service Providers
                </a>
              </li>
              <li>
                <a
                  href="https://kryptohub.co/review/review-to-donate"
                  title="Review to Donate"
                >
                  Review to Donate
                </a>
              </li>
              <li>
                <a
                  href="https://kryptohub.co/resources"
                  title="Blog & Industry Surveys"
                >
                  Blog & Industry Surveys
                </a>
              </li>
              <li>
                <a
                  href="https://kryptohub.co/your-project"
                  title="Concierge Service"
                >
                  Concierge Service
                </a>
              </li>
              <li>
                <a
                  href="https://help.kryptohub.co/knowledge/for-buyers"
                  title="Buyer FAQs"
                >
                  Buyer FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 relative mb-16 before:mt-4 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-[20%] before:bg-cyan-600 ">
            <div className="mt-[20%] mb-6 text-gray-400">
              <h1 className="text-lg xl:text-2xl ">Service Providers</h1>
            </div>
            <ul className="flex flex-col justify-around h-3/4 lg:text-md xl:text-lg font-semibold">
              <li>
                <a
                  href="https://kryptohub.co/service-providers"
                  title="Service Provider Guide"
                >
                  Service Provider Guide
                </a>
              </li>
              <li>
                <a href="https://kryptohub.co/get-listed" title="Get Listed">
                  Get Listed
                </a>
              </li>
              <li>
                <a href="https://kryptohub.co/sponsorship" title="Sponsorship">
                  Sponsorship
                </a>
              </li>
              <li>
                <a
                  href="https://kryptohub.co/service-providers/marketing"
                  title="Marketing Opportunities"
                >
                  Marketing Opportunities
                </a>
              </li>
              <li>
                <a
                  href="https://help.kryptohub.co/knowledge/for-service-providers"
                  title="Service Provider FAQs"
                >
                  Service Provider FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 relative mb-16 4">
            <div className="mt-[20%] mb-6 text-gray-400">
              <h1 className="text-lg xl:text-2xl ">Contact</h1>
            </div>
            <ul className="flex flex-col justify-around h-1/3 text-xs">
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
              <li>
                1800 Massachusetts Ave. NW,
                <br />
                Suite 200
                <br />
                Washington DC 20036
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
