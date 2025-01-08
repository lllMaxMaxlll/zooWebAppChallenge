import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zoo } from "@/types/zoo";

const getZoos = async () => {
	const response = await fetch("http://localhost:3000/api/zoo");
	const zoos: Zoo[] = await response.json();
	return zoos;
};

export default async function ZooList() {
	const zoos = await getZoos();

	if (zoos.length === 0) {
		return <h1 className="text-2xl font-bold">No zoos found</h1>;
	}

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6 w-full">Zoo List</h1>
			<div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{zoos.map((zoo) => (
					<div key={zoo.id} className="border p-4 rounded-lg">
						<h2 className="text-xl font-semibold">{zoo.name}</h2>
						<p>{zoo.city}</p>
						<p>{zoo.operatingHours}</p>
						<Link href={`/zoos/${zoo.id}`}>
							<Button className="mt-2">View Details</Button>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
