// filepath: /c:/Users/Satvikk/Desktop/social/app/components/VideoComponent.tsx
import { IKVideo } from 'imagekitio-next';
import Link from 'next/link';
import { IVideo } from '@/models/Video';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LikeButton } from "./LikeButton";
import { useSession } from "next-auth/react";


export default function VideoComponent({ video }: { video: IVideo }) {
  const { data: session } = useSession();
  const isLiked = video.likes?.includes(session?.user?.id as string) ?? false;
  return (
    <Card className="max-w-xs overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/videos/${video._id}`} className="block">
          <div
            className="relative w-full rounded-lg overflow-hidden"
            style={{ aspectRatio: '9/16' }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: '1920',
                  width: '1080',
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4">
        <Link
          href={`/videos/${video._id}`}
          className="block hover:opacity-80 transition-opacity"
        >
          <h2 className="font-semibold text-md md:text-lg leading-none tracking-tight mb-2">
            {video.title}
          </h2>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>

        <div className="flex items-center gap-2">
        {video._id && (
          <LikeButton
            videoId={video._id.toString()}
            initialLikes={video.likes?.length ?? 0}
            initialIsLiked={isLiked}
          />
        )}
      </div>

      </CardContent>
    </Card>
  );
}