"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-5">
      <h1 className="text-4xl font-bold">Crescendo 🎵</h1>
      <h3 className="text-1xl mb-6">Your music, your universe</h3>
      <VideoFeed videos={videos} />
    </main>
  );
}
