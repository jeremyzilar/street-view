import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 py-12 pb-24 w-auto tablet-lg:w-desktop mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
