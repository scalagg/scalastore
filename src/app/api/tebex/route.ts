import { NextResponse } from 'next/server';
import axios from 'axios';

const TEBEX_TOKEN = process.env.NEXT_PUBLIC_TEBEX_TOKEN;
const TEBEX_API_URL = 'https://headless.tebex.io/api/accounts';

const tebexApi = axios.create({
  baseURL: `${TEBEX_API_URL}/${TEBEX_TOKEN}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    const response = await tebexApi.get(`/${endpoint}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Tebex API Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch data from Tebex' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const response = await tebexApi.post(`/${endpoint}`, body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Tebex API Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: error.response?.status || 500 }
    );
  }
} 