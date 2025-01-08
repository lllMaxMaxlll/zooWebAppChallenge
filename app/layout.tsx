import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { SidebarNav } from "@/components/SidebarNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Zoo Management",
	description: "Manage your zoo and animals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SidebarProvider>
					<div className="flex h-screen justify-center content-center w-max">
						<SidebarNav />
						<SidebarInset className="flex-1 overflow-auto">
							<main className="container mx-auto px-4 py-8">{children}</main>
						</SidebarInset>
					</div>
					<Toaster />
				</SidebarProvider>
			</body>
		</html>
	);
}
