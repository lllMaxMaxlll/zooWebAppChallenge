"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/services/api";
import { useRouter } from "next/navigation";

export default function DeleteZooButton({ id }: { id: string }) {
	const router = useRouter();

	const handleRemove = async (id: string) => {
		try {
			apiRequest(`/api/zoo/${id}`, "DELETE");

			toast({
				title: "Zoo removed successfully",
				description: "The zoo has been removed.",
			});
			router.push("/zoos");
		} catch {
			toast({
				title: "Error",
				description: "Failed to remove zoo. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<Button className="my-2" variant="destructive" onClick={() => handleRemove(id)}>
			Remove Zoo
		</Button>
	);
}
