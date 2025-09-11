import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

function CaredButton({
  path,
  lable,
  icon,
}: {
  path: string;
  lable: string;
  icon: React.ReactElement;
}) {
  return (
    <Card className="flex-row overflow-hidden items-center justify-center gap-1  px-20 py-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <Link href={`/account/${path}`} className="cursor-pointer">
        <CardContent>
          <div className="flex flex-col h-full w-full  justify-center items-center">
            <div className="w-4 h-4 text-center mb-2">{icon}</div>
            <h2 className="italic text-lg text-center  mt-3">{lable}</h2>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default CaredButton;
