import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { name, city, operatingHours } = await req.json();

		const newZoo = await db.zoo.create({
			data: {
				name,
				city,
				operatingHours,
			},
		});

		return NextResponse.json(newZoo, { status: 201 });
	} catch (error) {
		console.error("Error creating zoo:", error);
		return NextResponse.json({ error: "Error creating zoo" }, { status: 500 });
	}
}

export async function GET() {
	try {
		const zoos = await db.zoo.findMany();
		return NextResponse.json(zoos, { status: 200 });
	} catch (error) {
		console.error("Error fetching zoos:", error);
		return NextResponse.json({ error: "Error fetching zoos" }, { status: 500 });
	}
}
