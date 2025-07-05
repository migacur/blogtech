"use client";
import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import Like from "./Svg/Like";
import Dislike from "./Svg/Dislike";
import { colorVotos } from "../helpers/colorVotos";
import { useRouter } from "next/navigation";

const Voto = ({ post, postId, userId }) => {
  //const [vote, setVote] = useState(initialVote || null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

 const handleVote = async (voteType) => {
  setIsLoading(true);

  try {
    const data = { condition: voteType, postId, userId };
    const response = await fetch("/api/post/vote", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      Swal.fire({ title: "", text: jsonResponse.msg, icon: "success" });
      router.refresh(); // Recarga los datos del servidor
    } else {
      const errorData = await response.json();
      Swal.fire({ title: "", text: errorData.msg || "Error al registrar el voto", icon: "error" });
    }
  } catch (e) {
    console.error("Error en la solicitud:", e);
    Swal.fire({ title: "", text: "Ha ocurrido un error al realizar esta acción", icon: "error" });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex items-center ">
      <div
        onClick={() => handleVote("like")}
        className={`bg-slate-200 text-[#404040] font-bold rounded-md p-2 flex justify-center items-center cursor-pointer ${
          post?.resultado_voto === "like" && "shadow-md text-green-600  bg-slate-300"
        }`}
        aria-pressed={post?.resultado_voto === "like"}
        disabled={isLoading}
      >
        <Like clase={post?.resultado_voto} />
        Si
      </div>
      <p className={`text-[1.1rem] mx-3 font-bold  ${colorVotos(post?.cantidad_votos)}`}>{post?.cantidad_votos || 0}</p>
      <div
        onClick={() => handleVote("dislike")}
        className={`bg-slate-200 rounded-md p-2 text-[#404040] font-bold flex justify-center items-center cursor-pointer ${
          post?.resultado_voto === "dislike" && " shadow-md text-red-600  bg-slate-300"
        }`}
        aria-pressed={post?.resultado_voto === "dislike"}
        disabled={isLoading}
      >
        <Dislike clase={post?.resultado_voto} />
        No
      </div>
    </div>
  );
};

export default Voto;