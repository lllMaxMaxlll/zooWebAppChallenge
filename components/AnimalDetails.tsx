import { Animal } from "@/types/zoo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function AnimalDetails({ animal, onClose }: { animal: Animal; onClose: () => void }) {
	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{animal.name}</DialogTitle>
					<DialogDescription>
						Species: {animal.species}
						<br />
						Gender: {animal.gender}
						<br />
						Number of Legs: {animal.legs}
						<br />
						{animal.species === "GIRAFFE" && (
							<>
								Height: {animal.height} meters
								<br />
							</>
						)}
						{animal.species === "CROCODILE" && (
							<>
								Number of Teeth: {animal.teeth}
								<br />
							</>
						)}
						{animal.species === "GIANT_TORTOISE" && (
							<>
								Age: {animal.age} years
								<br />
								Life Stage: {getLifeStage(animal.age!)}
							</>
						)}
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

function getLifeStage(age: number): string {
	if (age < 50) return "Young";
	if (age < 100) return "Middle-aged";
	return "Old";
}
