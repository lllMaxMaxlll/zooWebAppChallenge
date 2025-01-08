"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AnimalSchema } from "@/schemas";

type FormData = z.infer<typeof AnimalSchema>;

export function AnimalForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(AnimalSchema),
	});

	const onSubmit = async (data: FormData) => {
		const response = await fetch("/api/animal", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			alert("Animal added successfully!");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<Label htmlFor="name">Animal Name</Label>
				<Input {...register("name")} id="name" />
				{errors.name && <span>{errors.name.message}</span>}
			</div>

			<div>
				<Label htmlFor="species">Species</Label>
				<Input {...register("species")} id="species" />
				{errors.species && <span>{errors.species.message}</span>}
			</div>

			<div>
				<Label htmlFor="age">Age</Label>
				<Input {...register("age", { valueAsNumber: true })} id="age" />
				{errors.age && <span>{errors.age.message}</span>}
			</div>

			<div>
				<Label htmlFor="gender">Gender</Label>
				<Input {...register("gender")} id="gender" />
				{errors.gender && <span>{errors.gender.message}</span>}
			</div>

			<Button type="submit">Add Animal</Button>
		</form>
	);
}
