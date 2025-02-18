import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("myToken");
  const usuario = cookieStore.get("usuario");

  if (!token) {
    return NextResponse.json({
      message: "No has iniciado sesión",
    }, {
      status: 401,
    });
  }

  try {
    cookieStore.delete("myToken");
    cookieStore.delete("usuario");

    const response = NextResponse.json(
      { message: "Sesión cerrada correctamente" },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error interno del servidor" }, {
      status: 500,
    });
  }
}
