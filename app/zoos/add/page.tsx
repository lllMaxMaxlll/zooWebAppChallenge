"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { ZooSchema } from "@/schemas";

export default function AddZoo() {
	const [formData, setFormData] = useState({
		name: "",
		city: "",
		operatingHours: "",
	});
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			ZooSchema.parse(formData);
			const response = await fetch("/api/zoo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				toast({
					title: "Zoo added successfully",
					description: "The new zoo has been added to the database.",
				});
				router.push("/zoos");
			} else {
				throw new Error("Failed to add zoo");
			}
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
					description: "Failed to add zoo. Please try again.",
					variant: "destructive",
				});
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Add New Zoo</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" value={formData.name} onChange={handleChange} required />
				</div>
				<div>
					<Label htmlFor="city">City</Label>
					<Input id="city" name="city" value={formData.city} onChange={handleChange} required />
				</div>
				<div>
					<Label htmlFor="operatingHours">Operating Hours</Label>
					<Input
						id="operatingHours"
						placeholder="9:00 AM - 5:00 PM"
						name="operatingHours"
						value={formData.operatingHours}
						onChange={handleChange}
						required
					/>
				</div>
				<Button type="submit">Add Zoo</Button>
			</form>
		</div>
	);
}
