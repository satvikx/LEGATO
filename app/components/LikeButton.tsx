// components/LikeButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  videoId: string;
  initialLikes: number;
  initialIsLiked: boolean;
}

export function LikeButton({ videoId, initialLikes, initialIsLiked }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  const handleLike = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to like videos",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient.likeVideo(videoId);
      setLikes(response.likes);
      setIsLiked(!isLiked);
      toast({
        title: response.message,
      });
    } catch (error) {
        console.error("Error processing like:", error);
      toast({
        title: "Error",
        description: "Could not process like",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isLoading}
      onClick={handleLike}
      className="gap-2"
    >
      <Heart
        className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
      />
      <span>{likes}</span>
    </Button>
  );
}