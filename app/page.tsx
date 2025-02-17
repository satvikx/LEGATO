"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import BottomSection from "./components/BottomSection";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Home() {
  
  // const handleScroll = () => {
  //   // Get the target element by its id
  //   const targetElement = document.getElementById('target-section');
    
  //   // Scroll smoothly to the target element
  //   targetElement!.scrollIntoView({ behavior: 'smooth' });
  // };
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { data: session } = useSession();
  const { toast } = useToast()

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
    <div>
      <section className="py-20 md:py-20 lg:py-28 xl:py-40 bg-black text-white">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your <span className="bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">Music</span>, Your Universe
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Upload, Share, and Discover Amazing Music and Learn from  Artists around the Globe.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => {
                  if (!session) {
                  toast({
                    title: "Please sign in to continue 🚀",
                    description: "You need to SIGN-IN to access this feature",
                    action: <Link href={`/login`}><ToastAction altText="Login">LOGIN</ToastAction></Link>
                  });
                  } else {
                    window.location.href = "/watch";
                  }
                }}
                >Explore ✨</Button>
                <Link href={`/upload`}><Button variant="outline" className="text-black dark:text-white">Showcase Your Talent!</Button></Link>
              </div>
            </div>
          </div>
        </section>
      {/* <h1 className="text-4xl font-bold">Crescendo 🎵</h1>
      <h3 className="text-1xl mb-6">Your music, your universe</h3> */}
      <div id="target-section"><VideoFeed videos={videos} /></div>
      <div><BottomSection/></div>
    </div>
  );
}
