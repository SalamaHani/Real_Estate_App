import Link from "next/link";
import React from "react";
import Image from "next/image";
import imgdark from "../../public/imges/app_uploads_sites_barringtonteam_2024_04_Barrington-Group-Logo-lg-text-1 (laiet).webp";
import imglhait from "../../public/imges/output-onlinepngtools.png";
import TitelSection from "../global/TitelSection";
function Footer() {
  return (
    <div>
      <TitelSection text={""} />
      <footer className=" py-5  pt-10  text-center ">
        <div className="  ">
          <div className="flex  flex-wrap justify-between">
            {/* Office Location */}
            <div
              id="office-location-1"
              className="w-full sm:w-1/2 md:w-1/3 mb-4"
            >
              <h5 className="mb-2 lg:mb-3 font-semibold text-white">
                Barrington Group Fine Properties
              </h5>
              <address className="not-italic mb-0">
                Samson Properties
                <br />
                6363 Walker Ln Suite 130 <br />
                Alexandria, VA 22310
              </address>
              <p className="mb-0">
                <span>O:</span>{" "}
                <a href="tel:(703) 763-0949" className="hover:underline">
                  (703) 763-0949
                </a>
              </p>
              <p className="truncate mb-0">
                <span>E:</span>{" "}
                <a
                  href="mailto:Barry@BarringtonGroupFP.com"
                  className="hover:underline"
                >
                  Barry@BarringtonGroupFP.com
                </a>
              </p>
            </div>

            {/* Logo Center */}
            <div className="w-full md:w-1/3 text-center mb-4">
              <Link href="/">
                <Image
                  width="150"
                  src={imgdark}
                  alt="hero"
                  className="mx-auto mb-1  hidden dark:block"
                />
                <Image
                  width="150"
                  src={imglhait}
                  alt="hero"
                  className="mx-auto block dark:hidden"
                />
              </Link>
            </div>

            {/* Other Stuff */}
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
              <h5 className="mb-2 lg:mb-3 font-semibold text-white">
                Other Stuff
              </h5>
              <ul className="list-none m-0 p-0 space-y-2">
                <li>
                  <a
                    href="https://barringtongroupfp.com/privacy-policy/"
                    className="hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://barringtongroupfp.com/terms-of-use/"
                    className="hover:underline"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Login (Buyers &amp; Sellers)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Row */}
          <div className="flex flex-wrap items-center mt-6">
            <div className="w-full xl:w-2/3">
              <p className="font-medium uppercase mb-0">
                © 2025 &amp; BEYOND. Barrington Group Fine Properties ・ ALL
                RIGHTS RESERVED
              </p>
            </div>
            <div className="w-full xl:w-1/3">
              <ul className="flex justify-center xl:justify-end space-x-4 mt-3 xl:mt-0">
                {/* Social icons go here */}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <small className="block mt-3 text-sm text-gray-300">
            <p className="flex items-center justify-center gap-2">
              <Image
                loading="lazy"
                width="71"
                height="35"
                src="https://barringtonteam.virtualresults.com/app/uploads/sites/barringtonteam/2024/03/footer-logo.png"
                alt="Fair Housing Logo"
              />
              Barrington Group Fine Properties fully supports the principles of
              the Fair Housing Act and the Equal Opportunity Act.
            </p>
          </small>

          {/* Footer Logos */}
          <div className="text-center mt-3">
            <a
              href="https://virtualresults.com/learnmore/?name=The%20Barrington%20Group%20Trusts"
              target="_blank"
            >
              {/* <Image
                 width="120"
                 height="120"
                 className="mx-auto"
                 src="https://ik.imagekit.io/virtualresults/wp-sites/tr:di-noimage.png,t-true,f-auto,pr-true/https%3A%2F%2Fvirtualresultsseo.com%2Fapp%2Fuploads%2F2019%2F08%2FVR-Platform-Powered-White.png"
                 alt="VR Platform Logo"
               /> */}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
