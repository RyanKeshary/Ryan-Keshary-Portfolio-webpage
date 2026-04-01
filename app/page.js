import dynamic from "next/dynamic";

const PortfolioClient = dynamic(() => import("@/app/components/PortfolioClient"), {
  ssr: false,
});

/**
 * Root page — renders the client-side portfolio.
 * SSR is disabled for the portfolio core to ensure browser API safety (Rule 1).
 */
export default function Home() {
  return <PortfolioClient />;
}
