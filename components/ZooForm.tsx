"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZooSchema } from "@/schemas";

type FormData = z.infer<typeof ZooSchema>;

export function ZooForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(ZooSchema),
	});

	const onSubmit = async (data: FormData) => {
		console.log(data);
		const response = await fetch("/api/zoo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		console.log(response);

		if (response.ok) {
			alert("Zoo added successfully!");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<Label htmlFor="name">Zoo Name</Label>
				<Input {...register("name")} id="name" />
				{errors.name && <span>{errors.name.message}</span>}
			</div>

			<div>
				<Label htmlFor="city">City</Label>
				<Input {...register("city")} id="city" />
				{errors.city && <span>{errors.city.message}</span>}
			</div>

			<div>
				<Label htmlFor="operatingHours">Operating Hours</Label>
				<Input {...register("operatingHours")} id="operatingHours" />
				{errors.operatingHours && <span>{errors.operatingHours.message}</span>}
			</div>

			<Button type="submit">Add Zoo</Button>
		</form>
	);
}
