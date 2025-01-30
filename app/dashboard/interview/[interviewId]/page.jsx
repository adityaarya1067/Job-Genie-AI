"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const[interviewId,setInterviewid]=useState("");

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        // Resolve params if it's a promise or ensure it has `interviewId`
        const resolvedParams = await Promise.resolve(params);

        if (resolvedParams?.interviewId) {
          setInterviewid(resolvedParams?.interviewId)
          await GetInterviewDetail(resolvedParams.interviewId);
        } else {
          console.error("Interview ID not found in params.");
        }
      } catch (error) {
        console.error(
          "Error resolving params or fetching interview details:",
          error
        );
      }
    };

    fetchInterviewDetails();
  }, [params]);

  /**
   * Fetch Interview Details by MockId/Interview ID
   */
  const GetInterviewDetail = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result?.length) {
        setInterviewData(result[0]);
      } else {
        console.error("No interview data found for the given ID.");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Job Details Section */}
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2>
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData?.jobPosition || "Loading..."}
            </h2>
            <h2>
              <strong>Job Description/Job Details:</strong>{" "}
              {interviewData?.jobDesc || "Loading..."}
            </h2>
            <h2>
              <strong>Years of Experience:</strong>{" "}
              {interviewData?.jobExperience || "Loading..."}
            </h2>
          </div>

          {/* Information Section */}
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "Additional information not available."}
            </h2>
          </div>
        </div>

        {/* Webcam Section */}
        <div>
          {webCamEnabled ? (
            <Webcam
              mirrored={true}
              style={{ height: 300, width: 300 }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
            />
          ) : (
            <>
              <div className="flex flex-col items-center justify-between">
                <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                <Button
                  variant="ghost"
                  onClick={() => setWebCamEnabled(true)}
                  className="mt-4"
                >
                  Enable Web Cam and Microphone
                </Button>
                <div className="flex justify-end items-end mt-5 bg-orange">
                  <Link
                    href={`/dashboard/interview/${interviewId || ""}/start`}
                  >
                    <Button>Start Interview</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
    </div>
  );
}

export default Interview;
