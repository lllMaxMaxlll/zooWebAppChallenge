import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
	try {
		const { id } = await params;

		await db.animal.delete({
			where: {
				id: parseInt(id),
			},
		});
		return NextResponse.json({ message: "Animal deleted successfully" }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Failed to delete animal" }, { status: 500 });
	}
}
