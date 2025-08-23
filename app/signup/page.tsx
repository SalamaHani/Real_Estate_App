import Image from "next/image";
import imgeslog from "../../public/imges/pexels-pixabay-280229.jpg";
import imgdark from "../../public/imges/app_uploads_sites_barringtonteam_2024_04_Barrington-Group-Logo-lg-text-1 (laiet).webp";
import imglhait from "../../public/imges/output-onlinepngtools.png";
import Link from "next/link";
import { SignUp } from "@/components/signup-form";
export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/">
            <Image
              width="178"
              height="58"
              src={imgdark}
              alt="hero"
              className={`col-span-2 w-24 sm:w-32 md:w-40 h-auto fixed-logo ls-is-cached lazyloaded sobject-contain lg:col-span-1 hidden dark:block   `}
            />
            <Image
              width="178"
              height="58"
              src={imglhait}
              alt="hero"
              className={`col-span-2 w-24 sm:w-32 md:w-40 h-auto fixed-logo ls-is-cached lazyloaded object-contain lg:col-span-1 block dark:hidden`}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUp />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={imgeslog}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
