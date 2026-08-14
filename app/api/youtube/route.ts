import { NextResponse } from "next/server";
import { fetchChannelVideos } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");
  const limit = Number(searchParams.get("limit") ?? "10");

  if (!channelId) {
    return NextResponse.json({ videos: [] }, { status: 400 });
  }

  const videos = await fetchChannelVideos(channelId, limit);
  return NextResponse.json({ videos });
}
