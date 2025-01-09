"use client";

import { useState } from "react";
import { Animal } from "@/types/zoo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AnimalDetails from "./AnimalDetails";

export default function AnimalList({ animals }: { animals: Animal[]; zooId: number }) {
	const [animalList, setAnimalList] = useState(animals);
	const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

	const handleRemove = async (animalId: string) => {
		try {
			const response = await fetch(`/api/animal/${animalId}`, {
				method: "DELETE",
			});
			if (response.ok) {
				setAnimalList(animalList.filter((animal) => animal.id !== parseInt(animalId)));
				toast({
					title: "Animal removed successfully",
					description: "The animal has been removed from the zoo.",
				});
			} else {
				throw new Error("Failed to remove animal");
			}
		} catch {
			toast({
				title: "Error",
				description: "Failed to remove animal. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<div>
			{animalList.map((animal) => (
				<div key={animal.id} className="border p-4 rounded-lg mb-4">
					<h3 className="text-xl font-semibold">{animal.name}</h3>
					<p>Species: {animal.species}</p>
					<p>Gender: {animal.gender}</p>
					<p>Number of Legs: {animal.legs}</p>
					{animal.species === "GIRAFFE" && <p>Height: {animal.height} cm</p>}
					{animal.species === "CROCODILE" && <p>Teeth: {animal.teeth}</p>}
					{animal.species === "GIANT_TORTOISE" && <p>Age: {animal.age}</p>}
					<div className="mt-2 space-x-2">
						<Button onClick={() => setSelectedAnimal(animal)}>View Details</Button>
						<Button variant="destructive" onClick={() => handleRemove(animal.id.toString())}>
							Remove
						</Button>
					</div>
				</div>
			))}
			{selectedAnimal && <AnimalDetails animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />}
		</div>
	);
}
