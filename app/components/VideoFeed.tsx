import { IVideo } from "@/models/Video";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 p-4">
        {videos.map((video) => (
          <div key={video._id?.toString()} className="w-[230px] md:w-[320px] flex-none">
            <VideoComponent video={video} />
          </div>
        ))}
        {videos.length === 0 && (
          <div className="w-full text-center py-12">
            <p className="text-muted-foreground">
              No videos found. You Can Start By Uploading some Videos.
            </p>
          </div>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
