import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Welcome to Zoo Management</h1>
			<p className="text-xl mb-8">Manage your zoos and animals with ease.</p>
			<div className="space-x-4">
				<Link href="/zoos">
					<Button>View Zoos</Button>
				</Link>
				<Link href="/zoos/add">
					<Button>Add New Zoo</Button>
				</Link>
			</div>
		</div>
	);
}
