import React from "react";

export default function Footer() {
  return (
    <footer className="sm:hidden md:hidden lg:hidden block bg-white fixed bottom-0 left-0 right-0 text-center border-t-1 border-gray-200 text-balck sm:p-0 p-3  shrink-0">
      <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
    </footer>
  );
}
