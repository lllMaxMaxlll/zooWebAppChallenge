export type Zoo = {
	id: number;
	name: string;
	city: string;
	operatingHours: string;
};

export type Animal = {
	id: number;
	zooId: number;
	species: AnimalSpecies;
	name: string;
	legs: number;
	gender: "Male" | "Female";

	height?: number; // For Giraffe (in meters)
	teeth?: number; // For Crocodile
	age?: number; // For Giant Tortoise
};

export type AdmissionPrice = {
	price: number;
	dayOfWeek: string;
};

export type AnimalSpecies = "GIRAFFE" | "CROCODILE" | "GIANT_TORTOISE";
