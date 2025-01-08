import { useState } from "react";
import { z, ZodSchema } from "zod";
import { apiRequest } from "@/services/api";

type UseFormHandlerProps<T> = {
	schema: ZodSchema<T>;
	url: string;
	method: "POST" | "GET" | "DELETE";
	onSuccess?: (response: unknown) => void;
};

export function useFormHandler<T>({ schema, url, method, onSuccess }: UseFormHandlerProps<T>) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (data: T) => {
		setIsLoading(true);
		setError(null);

		const validation = schema.safeParse(data);
		if (!validation.success) {
			setError(validation.error.issues.map((issue) => issue.message).join(", "));
			setIsLoading(false);
			return;
		}

		try {
			const response = await apiRequest<T, unknown>(url, method, validation.data);
			if (onSuccess) onSuccess(response);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	return { handleSubmit, isLoading, error };
}
