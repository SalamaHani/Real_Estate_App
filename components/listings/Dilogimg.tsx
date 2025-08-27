// import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export function DialogDemo({
  photo,
  isopen,
  handeldilog,
}: {
  photo: string;
  isopen: boolean;
  handeldilog: (open: boolean) => void;
}) {
  return (
    <Dialog open={isopen} onOpenChange={handeldilog}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Image
          // className="w-full size-40 object-cover"
          src={photo}
          width={425} // set width
          height={420}
          alt={`photo-${photo}`}
        />
      </DialogContent>
    </Dialog>
  );
}
