import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProviderClient from "./components/userProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BlogTech",
  description: "Tu blog de noticias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} relative min-h-screen`}>
        <UserProviderClient>
          <Header />
          <main className="w-[97%] lg:w-[86%] md:w/[90%] sm:w/[94%] mx-auto pt-8 pb-[10rem] grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 lg:gap-5 md:gap-4 sm:gap-2">
            {children}
          </main>
          <Footer />
        </UserProviderClient>
      </body>
    </html>
  );
}
