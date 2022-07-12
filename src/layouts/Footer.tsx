import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      id="common-footer"
      className={`bg-primary border-t border-thirdary text-white relative z-50
    before:bg-cyan-600 before:h-[1px] before:absolute before:left-0 before:top-[155px] before:w-full sm:before:block before:hidden`}
    >
      <div className="grid sm:grid-cols-5 grid-cols-1 sm:gap-x-[35px] sm:pl-[35px] sm:pr-[10px] sm:container mx-auto sm:px-0 px-8">
        <div
          className="sm:my-[110px] my-[20px] relative w-full sm:pl-0 pl-4
              before:bg-cyan-600 before:absolute sm:before:bottom-[-97px] sm:before:right-[-8px] sm:before:top-[-110px] sm:before:w-[1px] 
              before:bottom-[-15px] sm:before:h-auto before:h-[1px] before:right-[-23px] before:left-auto before:top-auto before:w-[100vw]
              after:absolute after:bg-cyan-600 after:w-[1px] after:h-20 after:left-0 after:top-0 sm:after:w-0"
        >
          <Link href="/">
            <a
              aria-label="kryptohub logotype"
              className="block h-[36px] sm:mb-[49px] sm:mt-[-15px] w-[128px]"
            >
              <span className="lg:text-3xl md:text-2xl sm:text-xl text-2xl font-semibold text-white cursor-pointer flex items-center">
                Kryptohub
              </span>
            </a>
          </Link>
          <ul className="text-thirdary text-xs sm:block hidden">
            <li className="my-[11px]">&copy; 2022 kryptohub</li>
            <li className="my-[11px]">
              <a href="/terms">Terms of Service</a>
            </li>
            <li className="my-[11px]">
              <a href="/privacy">Privacy</a>
            </li>
            <li className="my-[11px]">
              We updated our Terms of Service
              <br />
              on August 9, 2021.
            </li>
          </ul>
        </div>
        <div className="lg:mt-[110px] sm:mt-[80px] sm:mb-[100px] relative w-full sm:pl-0 pl-4">
          <div className="text-[#6b7a7e] inline-block font-normal leading-[30px] mb-[38px] capitalize text-xl">
            About kryptohub
          </div>
          <ul className="text-lg">
            <li className="mb-[20px]">
              <a href="/about-us" title="Our Story">
                Our Story
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/careers" title="Careers">
                Careers
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/press-releases" title="News & Press Releases">
                News & Press Releases
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/methodology" title="Research Methodology">
                Research Methodology
              </a>
            </li>
          </ul>
        </div>
        <div
          className="sm:my-[110px] relative w-full sm:pl-0 pl-4
            before:bg-cyan-600 before:absolute before:left-[-20px] before:bottom-0 sm:before:w-[1px] before:w-0 before:top-[26px]"
        >
          <div className="text-[#6b7a7e] inline-block font-normal leading-[30px] mb-[38px] capitalize text-xl">
            Buyers
          </div>
          <ul className="text-lg">
            <li className="mb-[20px]">
              <a href="/sitemap" title="Browse All Directories">
                Browse All Directories
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/review" title="Review Service Providers">
                Review Service Providers
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/review/review-to-donate" title="Review to Donate">
                Review to Donate
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/resources" title="Blog & Industry Surveys">
                Blog & Industry Surveys
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/your-project" title="Concierge Service">
                Concierge Service
              </a>
            </li>
            <li className="mb-[20px]">
              <a
                href="https://help.kryptohub.co/knowledge/for-buyers"
                title="Buyer FAQs"
              >
                Buyer FAQs
              </a>
            </li>
          </ul>
        </div>
        <div
          className="lg:mt-[110px] sm:mt-[80px] sm:mb-[100px] relative w-full sm:pl-0 pl-4
            before:bg-cyan-600 before:absolute sm:before:left-[-20px] sm:before:bottom-0 sm:before:w-[1px] sm:before:top-[26px]
            before:bottom-[-15px] sm:before:h-auto before:h-[1px] before:right-[-23px] before:left-auto before:top-0 before:w-[100vw]
            after:absolute after:bg-cyan-600 after:w-[1px] after:h-16 after:left-0 after:top-0 sm:after:w-0"
        >
          <div className="text-[#6b7a7e] inline-block font-normal leading-[30px] mb-[38px] capitalize text-xl">
            Service Providers
          </div>
          <ul className="text-lg">
            <li className="mb-[20px]">
              <a href="/service-providers" title="Service Provider Guide">
                Service Provider Guide
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/get-listed" title="Get Listed">
                Get Listed
              </a>
            </li>
            <li className="mb-[20px]">
              <a href="/sponsorship" title="Sponsorship">
                Sponsorship
              </a>
            </li>
            <li className="mb-[20px]">
              <a
                href="/service-providers/marketing"
                title="Marketing Opportunities"
              >
                Marketing Opportunities
              </a>
            </li>
            <li className="mb-[20px]">
              <a
                href="https://help.kryptohub.co/knowledge/for-service-providers"
                title="Service Provider FAQs"
              >
                Service Provider FAQs
              </a>
            </li>
          </ul>
        </div>
        <div
          className="sm:my-[110px] relative w-full sm:pl-0 pl-4
            before:bg-cyan-600 before:absolute before:left-[-20px] before:bottom-0 sm:before:w-[1px] before:w-0 before:top-[26px]"
        >
          <div className="text-[#6b7a7e] inline-block font-normal leading-[30px] mb-[38px] capitalize text-xl">
            Contact
          </div>
          <ul className="text-sm">
            <li className="mb-[20px]">
              <a href="https://help.kryptohub.co/contact-us" title="Contact Us">
                Contact Us
              </a>
            </li>
            <li className="mb-[20px]">
              <a
                href="https://surveys.hotjar.com/s?siteId=197386&surveyId=136158"
                title="Site Feedback"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Site Feedback
              </a>
            </li>
            <li className="mb-[20px]">
              1800 Massachusetts Ave. NW,
              <br />
              Suite 200
              <br />
              Washington DC 20036
            </li>
          </ul>
        </div>
        <div
          className="sm:my-[110px] relative w-full  sm:hidden text-xs block 
        before:absolute before:bg-cyan-600 before:top-0 before:h-[1px] before:right-[-23px] before:w-[101vw] "
        >
          <ul className="flex items-center justify-center mb-4 flex-wrap">
            <li className="mx-8 mt-6">&copy; 2022 kryptohub</li>
            <li className="mx-8 mt-6">
              <a href="/terms">Terms of Service</a>
            </li>
            <li className="mx-8 mt-6">
              <a href="/privacy">Privacy</a>
            </li>
            <li className="mx-8 mt-6 w-full text-center ">
              We updated our Terms of Service
              <br />
              on August 9, 2021.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
