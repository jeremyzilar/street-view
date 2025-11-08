import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function PageLayout({ children, showHeader = true }: PageLayoutProps) {
  return (
    <div>
      {showHeader && <Header />}
      <main className="min-h-screen max-w-desktop-lg mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
