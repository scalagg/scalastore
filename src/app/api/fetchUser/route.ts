import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const platform = searchParams.get('platform') || 'java';

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    try {
        const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
                return null;
            });

        if (!data) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            userData: data
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
} 