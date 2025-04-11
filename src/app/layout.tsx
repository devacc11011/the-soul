import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "The-Soul",
    description: "Community for balatro",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="dracula">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div id="portal"/>
        <Navbar/>
        <div className="">
            <main className="min-h-dvh">
                {children}
            </main>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
