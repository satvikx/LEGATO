"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IVideo } from "@/models/Video";
import VideoComponent from "../components/VideoComponent";

export default function WatchPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [videos, setVideos] = useState<IVideo[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      async function fetchVideos() {
        try {
          const response = await fetch("/api/videos");
          const data = await response.json();
          setVideos(data);
          console.log("Fetched videos:", data);  
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      }
      fetchVideos();
    }, []);
  
    const nextVideo = () => {
      if (currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    const prevVideo = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    if (!videos.length) {
      return <p className="text-center text-gray-500">Loading videos...</p>;
    }
  
    const currentVideo = videos[currentIndex];

  return (
    <div className="h-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30} minSize={30} maxSize={70} collapsible={false} collapsedSize={5}>
          <div className="flex h-full flex-col bg-black text-white">
            <div className="flex-1 flex items-center justify-center overflow-hidden py-6">
              <VideoComponent key={currentVideo._id?.toString()} video={currentVideo} />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <Tabs defaultValue="pdf" className="h-full">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <TabsList>
                  <TabsTrigger value="pdf">PDF Viewer</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
                  {isCollapsed ? <ChevronLeft /> : <ChevronRight />}
                </Button>
              </div>
              <div className="flex-1 overflow-auto">
                <TabsContent value="pdf" className="h-full">
                  {/* <iframe src="/placeholder-document.pdf" className="h-full w-full" title="PDF Viewer" /> */}
                  <iframe
                    src={`https://ik.imagekit.io/satvik/${currentVideo.pdfUrl}`} 
                    className="h-full w-full" title="PDF Viewer"
                    />
                </TabsContent>
                <TabsContent value="notes" className="h-full p-4">
                  <textarea
                    className="h-full w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Take notes here..."
                  />
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </ResizablePanel>
        {/* Navigation Controls */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between w-full max-w-6xl px-4">
        <Button
          onClick={prevVideo}
          disabled={currentIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft /> Previous
        </Button>
        <Button
          onClick={nextVideo}
          disabled={currentIndex === videos.length - 1}
          className="flex items-center gap-2"
        >
          Next <ChevronRight />
        </Button>
      </div>
      {/* </div> */}
          </ResizablePanelGroup>
    </div>
  )
}