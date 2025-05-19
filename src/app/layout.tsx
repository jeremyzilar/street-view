import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PasswordProtection } from "@/components/PasswordProtection";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isAuthenticated ? (
            <>
              {children}
              <Footer />
            </>
          ) : (
            <PasswordProtection />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
