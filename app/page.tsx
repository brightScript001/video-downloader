"use client";
import React, { useState } from "react";
import VideoDownloader from "./VideoDownloader/VideoDownloader";

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#000] min-h-screen p-10">
      <section className="text-center mb-6">
        <h1 className="font-black text-[24.83px] lg:text-[50px] text-gray-900 dark:text-white">
          <span className="text-[#6C5CE7] dark:text-[#A29BFE]">YouTube</span>{" "}
          Video Downloader
        </h1>
        <div className="mt-4 text-[10px] lg:text-[22px] text-gray-900 dark:text-white">
          <p className="mb-4">
            Try this unique tool for quick, hassle-free downloads from YouTube.
          </p>
          <p className="font-semibold text-red-500 dark:text-red-400 mb-4">
            Note: WE DO NOT ALLOW/SUPPORT THE DOWNLOAD OF COPYRIGHTED MATERIAL!
          </p>
        </div>
      </section>

      <VideoDownloader />

      <div className="mt-6 text-[10px] lg:text-[22px] text-center text-gray-900 dark:text-white">
        <p className="mb-4">
          By using our service you accept our{" "}
          <span className="text-[#6C5CE7] dark:text-[#A29BFE] cursor-pointer hover:underline">
            Term of Service
          </span>{" "}
          and{" "}
          <span className="text-[#6C5CE7] dark:text-[#A29BFE] cursor-pointer hover:underline">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </main>
  );
}
