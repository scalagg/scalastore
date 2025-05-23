import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { basketIdent, package_id, quantity } = await req.json();

    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
        const response = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages/remove`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ package_id }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.detail || 'Failed to remove from basket' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ basket: data, message: "Package removed from basket" });
    }

    // Update quantity
    const response = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            package_id: package_id,
            quantity: quantity
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ message: errorData.detail || 'Failed to update quantity' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ basket: data, message: "Quantity updated" });
} 