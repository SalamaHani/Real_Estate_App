import CaredButton from "@/components/account/CaredButton";
import Continer from "@/components/global/Continer";
import {
  Heart,
  MessageCircleCode,
  Save,
  Search,
  SquarePen,
} from "lucide-react";
import React from "react";

function page() {
  return (
    <Continer>
      <div className="mt-15 mb-5">
        <div className=" mb-10 lg:mb-14 flex-col  justify-center  items-center">
          <h2 className=" font-semibold text-center italic text-3xl md:text-3xl ">
            My Account
          </h2>
          <p className="mt-1 text-lg   text-center italic text-neutral-400">
            Welcome to s member dashboard. We hope these services elevate your
            Real Estate experience and help you find the home of your dreams!
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-wrap gap-5 ">
        <CaredButton
          path={"favorites"}
          lable={"Favorites Listeing"}
          icon={<Heart />}
        />
        <CaredButton
          path={"profile"}
          lable={"Edit Profile"}
          icon={<SquarePen />}
        />
        <CaredButton path={"listing"} lable={"New Search"} icon={<Search />} />
        <CaredButton
          path={"reviews"}
          lable={"Your Reviews"}
          icon={<MessageCircleCode />}
        />
        <CaredButton
          path={"savedserch"}
          lable={"Saved Searches"}
          icon={<Save />}
        />
      </div>
    </Continer>
  );
}

export default page;
