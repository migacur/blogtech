"use client";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import Like from "./Svg/Like";
import Dislike from "./Svg/Dislike";
import { colorVotos } from "../helpers/colorVotos";

const Voto = ({ postId, userId, initialVote, votos, actualizarVotos }) => {
  const [vote, setVote] = useState(initialVote || null);
  const [isLoading, setIsLoading] = useState(false);

  // Sincroniza el estado local cuando cambia initialVote
  useEffect(() => {
    setVote(initialVote || null);
  }, [initialVote]);

  const handleVote = useCallback(async (voteType) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/post/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          condition: voteType,
          postId,
          userId
        })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({ title: "", text: data.msg, icon: "success" });
        
        // Actualización optimista
        const newVote = vote === voteType ? null : voteType;
        setVote(newVote);
        
        // Notificar al componente padre
        actualizarVotos(newVote);
      } else {
        throw new Error(data.msg || "Error al votar");
      }
    } catch (error) {
      Swal.fire({ title: "", text: error.message, icon: "error" });
      // Revertir a valor anterior en caso de error
      setVote(initialVote);
    } finally {
      setIsLoading(false);
    }
  }, [postId, userId, vote, initialVote, actualizarVotos]);

  return (
    <div className="flex items-center">
      <button
        onClick={() => handleVote("like")}
        className={`bg-slate-200 text-[#404040] font-bold rounded-md p-2 flex justify-center items-center ${
          vote === "like" 
            ? "shadow-md text-green-600 bg-slate-300" 
            : "hover:bg-slate-300"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        disabled={isLoading}
      >
        <Like active={vote === "like"} />
        Si
      </button>
      
      <p className={`text-[1.1rem] mx-3 font-bold ${colorVotos(votos)}`}>
        {votos || 0}
      </p>
      
      <button
        onClick={() => handleVote("dislike")}
        className={`bg-slate-200 rounded-md p-2 text-[#404040] font-bold flex justify-center items-center ${
          vote === "dislike" 
            ? "shadow-md text-red-600 bg-slate-300" 
            : "hover:bg-slate-300"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        disabled={isLoading}
      >
        <Dislike active={vote === "dislike"} />
        No
      </button>
    </div>
  );
};

export default Voto;