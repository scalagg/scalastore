import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { basketIdent, package_id, quantity } = await req.json();

    const response = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            package_id: package_id,
            quantity: quantity || 1
        }),
    }).then(res => res.json()).catch(err => {
        console.log(err);
        return { status: 500, detail: 'Failed to add to basket' };
    });

    if (response.status === 400) {
        console.log("Error when adding to basket", response);
        return NextResponse.json({ message: response.detail }, { status: 400 });
    }

    return NextResponse.json({ basket: response, message: "This product has been added to your cart" });
} 