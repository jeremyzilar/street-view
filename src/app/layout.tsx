import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { PasswordProtection } from "@/components/PasswordProtection";
import { cookies } from "next/headers";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Many Paths SF",
  description:
    "Collective care coordination for people experiencing street homelessness in Santa Fe",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("many_paths_auth");

  console.log("Root Layout - Is authenticated:", isAuthenticated);
  console.log("Root Layout - All cookies:", cookieStore.getAll());

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={publicSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isAuthenticated ? (
            <main className="relative min-h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto flex flex-col tablet-lg:flex-row">
              <Header />
              <div className="p-4 py-12 tablet-lg:p-4 tablet-lg:pl-12 pb-24 h-full w-auto tablet-lg:w-desktop tablet-lg:ml-[240px]">
                {children}
              </div>
            </main>
          ) : (
            <PasswordProtection />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
