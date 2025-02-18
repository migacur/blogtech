"use client"
const Like = ({ clase }) => {
  const fillColor = clase === "like" ? "text-green-600" : "#fff";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="25" height="25" viewBox="0 0 24 24"
  className={`drop-shadow-md mr-1 ${clase ? "text-green-600" : ""}`}
    fill={fillColor === "text-green-600" ? "currentColor" : fillColor} 
    >
  <path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"/>
  </svg>
  );
};

export default Like;
