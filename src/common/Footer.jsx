import React from "react";

export default function Footer() {
  return (
    <footer className=" bg-white fixed bottom-0 left-0 right-0 text-center border-t-1 border-gray-200 text-balck sm:p-0 p-1  sm:py-6 shrink-0">
      <p>&copy; {new Date().getFullYear()} Company Registration &amp; Verification. All rights reserved.</p>
    </footer>
  );
}
