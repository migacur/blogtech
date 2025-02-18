import { NextResponse } from "next/server";

export async function GET() {
   
    const data = { message: "Hola, mundo" };
    console.log(data)
    return Response.json(data);
   
  }