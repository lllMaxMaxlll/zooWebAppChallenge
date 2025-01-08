import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const { species, name, legs, gender, height, teeth, age, zooId } = body;

		if (!name || !species || !legs || !gender || !zooId) {
			return NextResponse.json({ message: "Invalid input" }, { status: 400 });
		}

		const animal = await db.animal.create({
			data: { name, species, gender, legs, zooId, height, teeth, age },
		});

		return NextResponse.json(animal, { status: 201 });
	} catch (error) {
		console.error("Error in POST /api/animal:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
