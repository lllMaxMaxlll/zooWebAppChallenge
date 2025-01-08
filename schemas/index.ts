import { z } from "zod";

const AnimalSchema = z.object({
	species: z.enum(["GIRAFFE", "CROCODILE", "GIANT_TORTOISE"]),
	name: z.string().min(1, "Name is required"),
	legs: z.number().int().min(0, "Legs must be a positive number"),
	gender: z.enum(["MALE", "FEMALE"]),

	height: z.number().optional(),
	teeth: z.number().int().optional(),
	age: z.number().int().optional(),
});

const ZooSchema = z.object({
	name: z.string().min(1, "Name is required"),
	city: z.string().min(1, "City is required"),
	operatingHours: z.string().min(1, "Operating hours are required"),
});

export { AnimalSchema, ZooSchema };
