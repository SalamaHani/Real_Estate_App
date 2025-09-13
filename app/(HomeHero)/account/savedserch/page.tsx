import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import { MotionDiv } from "@/components/motindev";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { deleteSeaved, fetshAllSavedSearsh } from "@/utils/actions";
import React from "react";
import { Calendar, House, Map } from "lucide-react";
import Link from "next/link";
import FormContainer from "@/components/form/FormContener";
import { IconButton } from "@/components/form/Buttons";
import Filtringbutglink from "@/components/sersh/Filtringbutglink";
async function page() {
  const savedsearsh = await fetshAllSavedSearsh();

  if (savedsearsh.length == 0)
    return (
      <Continer className="mt-20">
        <TitelSection text="you have no Saved yet" />
      </Continer>
    );
  return (
    <Continer className="mt-20">
      <TitelSection text="Your Saved Searsh" />
      <section className="grid md:grid-cols-2 gap-8 pt-12">
        {savedsearsh.map((saved) => {
          const { nameSearch, email_frequency, url, createdAt } = saved;
          return (
            <MotionDiv
              key={saved.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="relative">
                <CardHeader>
                  <div className=" flex items-center underline">
                    <House className="w-4 h-4 mr-1" />
                    Homes Sevad
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col ">
                    <div className="">
                      <div className=" flex ">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Name Search:
                        </span>
                        <p className="italic text-md ml-1  font-medium">
                          {nameSearch}
                        </p>
                      </div>
                    </div>
                    <div className="  flex ">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Notify Me:
                      </span>
                      <p className="italic text-md ml-1  font-medium">
                        {email_frequency}
                      </p>
                    </div>
                  </div>
                  <div className=" flex items-center">
                    <span className="text-sm mr-1 text-gray-500 dark:text-gray-400">
                      Filtres:
                    </span>
                    <Filtringbutglink Link={url} />
                  </div>
                  <div className=" w-full flex justify-between ">
                    <div className="text-xs  text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className=" flex  mt-1 items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {createdAt?.toISOString()}
                      </span>
                    </div>
                    <Link
                      href={`/listing?${url}`}
                      className="cursor-pointer flex items-center text-center text-sm  italic  hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg p-1"
                    >
                      View Map <Map className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </CardContent>
                <div className="absolute top-3 right-3">
                  <DeleteSeaved seavedId={saved.id} />
                </div>
              </Card>
            </MotionDiv>
          );
        })}
      </section>
    </Continer>
  );
}
const DeleteSeaved = ({ seavedId }: { seavedId: string }) => {
  return (
    <FormContainer className="" action={deleteSeaved}>
      <input type="text" readOnly hidden name="savedId" value={seavedId} />
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default page;
