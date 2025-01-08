"use client";

import { useEffect, useState } from "react";

export default function AdmissionPrice() {
	const [price, setPrice] = useState<number | null>(null);

	useEffect(() => {
		const day = new Date().getDay();
		let newPrice: number;

		switch (day) {
			case 1: // Monday
			case 2: // Tuesday
			case 4: // Thursday
			case 5: // Friday
				newPrice = 19.99;
				break;
			case 3: // Wednesday
				newPrice = 9.99;
				break;
			case 0: // Sunday
			case 6: // Saturday
				newPrice = 25.99;
				break;
			default:
				newPrice = 19.99;
		}

		setPrice(newPrice);
	}, []);

	if (price === null) return null;

	return (
		<div className="mt-4">
			<h3 className="text-xl font-semibold">Today Admission Price</h3>
			<p className="text-2xl font-bold">${price.toFixed(2)}</p>
		</div>
	);
}
