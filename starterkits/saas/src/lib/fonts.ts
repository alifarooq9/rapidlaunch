import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

export const fontSans = GeistSans;

export const fontHeading = localFont({
    src: "../assets/fonts/CabinetGrotesk-Variable.ttf",
    variable: "--font-cabinet-grotesk",
});
