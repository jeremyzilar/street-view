import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { PasswordProtection } from "@/components/PasswordProtection";
import { cookies } from "next/headers";
import Head from "next/head";
import { Bebas_Neue } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Street View",
  description: "Street View Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("streetview_auth");

  console.log("Root Layout - Is authenticated:", isAuthenticated);
  console.log("Root Layout - All cookies:", cookieStore.getAll());

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
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
