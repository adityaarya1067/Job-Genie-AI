"use client";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10 flex flex-col items-center ">
      <h2 className="my-5 font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Left Section: Job Information */}
        <div className="flex flex-col gap-5 p-5 bg-gray-50 shadow-md">
          <div className="flex flex-col p-5 border rounded-lg gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData?.jobPosition || "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>{" "}
              {interviewData?.jobDesc || "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>{" "}
              {interviewData?.jobExperience || "Loading..."}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex items-center text-yellow-500">
              <Lightbulb />
              <strong className="ml-2">Information</strong>
            </h2>
            <h2 className="mt-5 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        {/* Right Section: Camera */}
        <div className="flex flex-col items-center justify-center">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
                borderRadius: "12px",
                border: "2px solid #ccc",
                padding: "8px",
              }}
            />
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <WebcamIcon className="h-72 w-72 p-6 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                onClick={() => setWebCamEnabled(true)}
                className="px-6 py-3 bg-secondary text-black rounded-lg transition-all"
              >
                Enable Web Cam and Microphone
              </Button>
              <div className="flex justify-end items-end">
                <Link
                  href={"/dashboard/interview/" + params.interviewId + "/start"}
                >
                  <Button className="px-6 py-3 bg-primary text-white rounded-lg transition mt-4">
                    Start Interview
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
