import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 px-4 py-3 uppercase sm:px-6 bg-cyan-500">
      <Link to={"/posts"} className="text-white font-medium">
        People
      </Link>
      <p>Shamil</p>
    </header>
  );
}
