"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
// import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";
import PDFFileUpload from "./PdfUpload";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast"


interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  pdfUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  // const { showNotification } = useNotification();
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      pdfUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    // showNotification("Video uploaded successfully!", "success");
    toast({
      description: "Video uploaded successfully!",
    })
  };

  const handlePdfUploadSuccess = (response: IKUploadResponse) => {
    setValue("pdfUrl", response.filePath);
    // showNotification("PDF uploaded successfully!", "success");
    toast({
      description: "PDF uploaded successfully!",
    })
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handlePdfUploadProgress = (progress: number) => {
    setPdfUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      // showNotification("Please upload a video first", "error");
      toast({
        description: "Please upload a video first",
      })
      return;
    }

    if (!data.pdfUrl) {
      // showNotification("Please upload a PDF file first", "error");
      toast({
        description: "Please upload a PDF file first",
      })
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      // showNotification("Video published successfully!", "success");
      toast({
        description: "Video published Successfully! 🎉",
      })

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setValue("pdfUrl", "");
      setUploadProgress(0);
      setPdfUploadProgress(0);
    } catch (error) {
      // showNotification(
      //   error instanceof Error ? error.message : "Failed to publish video",
      //   "error"
      // );
      toast({
        description: error instanceof Error ? error.message : "Failed to publish video",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload Video</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-error text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="form-control space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <span className="text-error text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="form-control space-y-2">
            <Label>Upload Video</Label>
            <FileUpload
              fileType="video"
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />
            {uploadProgress > 0 && (
              <Progress value={uploadProgress} className="mt-2" />
            )}
          </div>

          <div className="form-control space-y-2">
            <Label>Upload PDF</Label>
            <PDFFileUpload
              fileType="pdf"
              onSuccess={handlePdfUploadSuccess}
              onProgress={handlePdfUploadProgress}
            />
            {pdfUploadProgress > 0 && (
              <Progress value={pdfUploadProgress} className="mt-2" />
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading || !uploadProgress || !pdfUploadProgress}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing Video...
              </>
            ) : (
              "Publish Video"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}