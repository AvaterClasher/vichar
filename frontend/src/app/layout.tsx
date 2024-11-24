/** @format */

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/utils/theme-provider";
import ReactQueryProvider from "@/utils/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Vichar",
	description: "A place to share your thoughts",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<ReactQueryProvider>
						<div className="flex flex-col min-h-screen">
							<main className="flex-grow">{children}</main>
							<Footer />
							<Toaster />
						</div>
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
