"use client";
import React, { useState } from "react";

const VideoDownloader: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [quality, setQuality] = useState("720p");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      alert("Please enter a valid video URL.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Fetching video from API...");

      const response = await fetch(
        "https://all-social-media-video-downloader.p.rapidapi.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-rapidapi-host":
              "all-social-media-video-downloader.p.rapidapi.com",
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
          },
          body: new URLSearchParams({ url: videoUrl }),
        }
      );

      console.log("Response Status:", response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const downloadUrl = data.video || data.url || data.link || null;
      if (downloadUrl) {
        window.location.href = downloadUrl;
      } else {
        alert("Download URL not found.");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      alert("Error downloading video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="grid grid-cols-[auto_1fr_auto] gap-3 w-full items-center">
        {/* Video Quality Dropdown */}
        <select
          className="p-2 border text-[16px] rounded-md dark:bg-[#000] dark:text-white dark:border-gray-700"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
          <option value="480p">480p</option>
          <option value="360p">360p</option>
        </select>

        {/* Video URL Input */}
        <input
          type="text"
          className="p-2 border rounded-md w-full dark:bg-[#000] dark:text-white dark:border-gray-700"
          placeholder="Paste video URL here"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <button
          className="p-2 bg-blue-600 text-[16px] text-white rounded-md disabled:opacity-50 whitespace-nowrap dark:bg-blue-500"
          onClick={handleDownload}
          disabled={isLoading}
        >
          {isLoading ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default VideoDownloader;
