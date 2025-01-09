import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Zoo, Animal } from "@/types/zoo";
import AdmissionPrice from "@/components/AdmissionPrice";
import AnimalList from "@/components/AnimalList";
import DeleteZooButton from "@/components/DeleteZooButton";

export default async function ZooDetails({ params }: { params: { id: string } }) {
	const { id } = await params;

	if (!id) {
		return <p className="text-xl font-bold">Invalid Zoo ID</p>;
	}

	const zoo: Zoo = await db.zoo.findUnique({
		where: { id: parseInt(id) },
	});

	if (!zoo) {
		return <p className="text-xl font-bold">Zoo not found</p>;
	}

	const animals: Animal[] = await db.animal.findMany({
		where: { zooId: zoo.id },
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">{zoo.name}</h1>
			<p>City: {zoo.city}</p>
			<p>Operating Hours: {zoo.operatingHours}</p>
			<AdmissionPrice />
			<h2 className="text-2xl font-semibold mt-8 mb-4">Animals</h2>
			{animals.length ? <AnimalList animals={animals} zooId={zoo.id} /> : <p>No animals found</p>}
			<Link href={`/zoos/${zoo.id}/add-animal`}>
				<Button className="mt-4">Add New Animal</Button>
			</Link>
			<div>
				<DeleteZooButton id={zoo.id.toString()} />
			</div>
		</div>
	);
}
