// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const base = searchParams.get("base") || "USD";
//   console.log(process.env.KEY_FREE_CUNTREY_API);
//   const res = await fetch(
//     `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.KEY_FREE_CUNTREY_API}&base_currency=${base}`
//   );

//   const data = await res.json();
//   return NextResponse.json(data);
// }
