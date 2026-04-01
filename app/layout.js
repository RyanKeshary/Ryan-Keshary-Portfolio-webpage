import dynamic from "next/dynamic";
import "./globals.css";
import Script from "next/script";

const SmoothScroll = dynamic(() => import("@/app/components/SmoothScroll"), {
  ssr: false,
});

/**
 * Root layout with SEO metadata, font loading, and theme flash prevention.
 */
export const metadata = {
  title: "Ryan Keshary | Portfolio",
  description:
    "Crafting high-performance digital experiences with precision and passion. Full-Stack Developer & Problem Solver.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Fonts & Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* Flash-less Theme Detection — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",s)})();`,
          }}
        />
      </head>
      <body>
        {/* Rule 1: Single, Top-Level Smooth Scroll Engine */}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
