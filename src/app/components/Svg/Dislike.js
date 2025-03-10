"use client"
const Dislike = ({ clase }) => {
  const fillColor = clase === "dislike" ? "text-red-600" : "#f9f9f9";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24"
    className={`drop-shadow-md mr-1 ${clase ? "text-red-600" : ""}`}
     fill={fillColor === "text-red-600" ? "currentColor" : fillColor}
    >
    <path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"/>
    </svg>
  );
};

export default Dislike;
