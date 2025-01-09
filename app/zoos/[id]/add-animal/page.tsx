"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { AnimalSchema } from "@/schemas";
import { apiRequest } from "@/services/api";

export default function AddAnimal({ params }: { params: Promise<{ id: string }> }) {
	const { id } = React.use(params);
	const router = useRouter();

	const [formData, setFormData] = useState({
		species: "",
		name: "",
		legs: 0,
		gender: "",
		height: 0,
		teeth: 0,
		age: 0,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			AnimalSchema.parse(formData);

			apiRequest("/api/animal", "POST", {
				...formData,
				zooId: parseInt(id),
			});

			toast({
				title: "Animal added successfully",
				description: "The new animal has been added to the zoo.",
			});

			router.push(`/zoos/${id}`);
		} catch (error) {
			if (error instanceof z.ZodError) {
				toast({
					title: "Validation Error",
					description: error.errors[0].message,
					variant: "destructive",
				});
			} else {
				toast({
					title: "Error",
					description: "Failed to add animal. Please try again.",
					variant: "destructive",
				});
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: ["legs", "height", "teeth", "age"].includes(name) ? parseFloat(value) : value,
		}));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Add New Animal</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="species">Species</Label>
					<Select onValueChange={(value) => handleSelectChange("species", value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select species" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="GIRAFFE">Giraffe</SelectItem>
							<SelectItem value="CROCODILE">Crocodile</SelectItem>
							<SelectItem value="GIANT_TORTOISE">Giant Tortoise</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" value={formData.name} onChange={handleChange} required />
				</div>
				<div>
					<Label htmlFor="legs">Number of Legs</Label>
					<Input id="legs" name="legs" type="number" value={formData.legs} onChange={handleChange} min={1} required />
				</div>
				<div>
					<Label htmlFor="gender">Gender</Label>
					<Select required onValueChange={(value) => handleSelectChange("gender", value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="MALE">Male</SelectItem>
							<SelectItem value="FEMALE">Female</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{formData.species === "GIRAFFE" && (
					<div>
						<Label htmlFor="height">Height (meters)</Label>
						<Input id="height" name="height" type="number" value={formData.height} step="0.1" min={0.1} onChange={handleChange} required />
					</div>
				)}
				{formData.species === "CROCODILE" && (
					<div>
						<Label htmlFor="teeth">Number of Teeth</Label>
						<Input id="teeth" name="teeth" type="number" value={formData.teeth} min={1} onChange={handleChange} required />
					</div>
				)}
				{formData.species === "GIANT_TORTOISE" && (
					<div>
						<Label htmlFor="age">Age</Label>
						<Input id="age" name="age" type="number" value={formData.age} min={1} onChange={handleChange} required />
					</div>
				)}
				<Button type="submit">Add Animal</Button>
			</form>
		</div>
	);
}
