"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSections from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  console.log(mockInterviewQuestion);

  useEffect(() => {
    const fetchParamsAndInterviewDetails = async () => {
      try {
        // Resolve params if it's a promise
        const resolvedParams = await Promise.resolve(params);

        // Ensure resolvedParams contains the interviewId
        if (resolvedParams?.interviewId) {
          await GetInterviewDetail(resolvedParams.interviewId);
        } else {
          console.error("Interview ID not found in params");
        }
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    fetchParamsAndInterviewDetails();
  }, [params]);

  /**
   * Used to Get Interview Details by MockId/Interview Id
   */
  const GetInterviewDetail = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      const jsonMockResp = JSON.parse(result[0]?.jsonMockResp);

      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSections
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
        />
        {/* Video/ Audio Recording */}
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            disabled={activeQuestionIndex == 0}
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}

        {activeQuestionIndex !==
          mockInterviewQuestion?.interviewQuestions.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}

        {activeQuestionIndex ==
          mockInterviewQuestion?.interviewQuestions.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
