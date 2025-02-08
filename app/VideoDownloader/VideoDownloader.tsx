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
      const response = await fetch(
        `https://api.apify.com/v2/acts/wilcode~all-social-media-video-downloader/run-sync-get-dataset-items?token=YOUR_API_TOKEN`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: videoUrl,
            proxySettings: {
              useApifyProxy: true,
              apifyProxyGroups: ["RESIDENTIAL"],
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch video");
      const data = await response.json();
      const downloadUrl = data[0]?.videoUrl;
      if (downloadUrl) {
        window.location.href = downloadUrl;
      } else {
        alert("Download URL not found.");
      }
    } catch (error) {
      console.error(error);
      alert("Error downloading video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="grid grid-cols-[auto_1fr_auto] gap-0 w-full items-center">
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
