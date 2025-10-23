import { Header } from "./Header";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="p-4 py-12 pb-24 h-full w-auto tablet-lg:w-desktop mx-auto">
        {children}
      </div>
    </>
  );
}
