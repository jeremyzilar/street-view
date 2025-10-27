import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function PageLayout({ children, showHeader = true }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      <main className="flex-1 p-4 py-12 pb-24 w-auto tablet-lg:w-desktop mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
