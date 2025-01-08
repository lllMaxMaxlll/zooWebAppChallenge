import { Animal } from "@/types/zoo";

const AVERAGE_MALE_GIRAFFE_HEIGHT = 5.3; // meters
const AVERAGE_FEMALE_GIRAFFE_HEIGHT = 4.3; // meters

export function compareGiraffeHeight(giraffe: Animal): string {
	if (giraffe.species !== "GIRAFFE" || !giraffe.height) {
		throw new Error("Invalid giraffe data");
	}

	const averageHeight = giraffe.gender === "Male" ? AVERAGE_MALE_GIRAFFE_HEIGHT : AVERAGE_FEMALE_GIRAFFE_HEIGHT;
	const height = giraffe.height;

	if (height > averageHeight) {
		return `This giraffe is taller than the average ${giraffe.gender.toLowerCase()} giraffe.`;
	} else if (height < averageHeight) {
		return `This giraffe is shorter than the average ${giraffe.gender.toLowerCase()} giraffe.`;
	} else {
		return `This giraffe is exactly the average height for a ${giraffe.gender.toLowerCase()} giraffe.`;
	}
}
