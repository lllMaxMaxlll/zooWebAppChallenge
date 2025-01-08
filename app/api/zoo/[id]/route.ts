import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
	try {
		await db.zoo.delete({
			where: {
				id: parseInt(params.id),
			},
		});
		return NextResponse.json({ message: "Animal deleted successfully" }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Failed to delete animal" }, { status: 500 });
	}
}
