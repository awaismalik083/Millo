// app/layout.js
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"], // you can add more like ["400", "600", "700"]
});

export const metadata = {
  title: "Millo-A Furniture Workshop",
  description: "A Furniture Workshop",
   icons: {
    icon: '/assets/favicon.png', // Points to public/favicon.ico
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} bg-[#F2EAEF] min-h-screen antialiased`}
      >
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </body>
    </html>
  );
}
