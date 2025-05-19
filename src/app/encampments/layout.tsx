import "@/styles/globals.css";
import { Header } from "@/components/Header";

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto flex">
      <Header />
      <div className="py-4 px-4 tablet-lg:pl-12 pb-24 w-desktop">
        {children}
      </div>
    </main>
  );
}
