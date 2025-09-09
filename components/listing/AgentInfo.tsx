import { Agent } from "@prisma/client";
import React from "react";

function AgentInfo({ Agent }: { Agent?: Agent | null }) {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <div className="flex flex-col justify-center">
        <div className="py-1 ">
          <div className="flex items-center">
            <div>
              <span className=" text-black dark:text-white">Email:</span>
            </div>
            <div className="flex justify-start ml-2">
              <span className="text-black text-sm dark:text-white">
                {Agent?.email}
              </span>
            </div>
          </div>
        </div>
        <div className="py-1">
          <div className="flex items-center">
            <div>
              <span className=" text-black  dark:text-white">Office:</span>
            </div>
            <div className="flex justify-start  ml-2">
              <span className="text-black text-sm dark:text-white">
                {Agent?.office_name}
              </span>
            </div>
          </div>
        </div>
        <div className="py-1">
          <div className="flex items-center">
            <div>
              <span className=" text-black dark:text-white">
                Mobile phone Office:
              </span>
            </div>
            <div className="flex justify-start  ml-2">
              <span className="text-black text-sm dark:text-white">
                {Agent?.mobile_phone_line_number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AgentInfo;
