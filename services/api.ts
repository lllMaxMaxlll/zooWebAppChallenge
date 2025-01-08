export async function apiRequest<T, R>(url: string, method: "GET" | "POST" | "DELETE", body?: T): Promise<R> {
	const options: RequestInit = {
		method,
		headers: { "Content-Type": "application/json" },
		body: body ? JSON.stringify(body) : undefined,
	};

	const response = await fetch(url, options);

	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`);
	}

	return response.json();
}
