"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
 const [feedbackList, setFeedbackList] = useState([]);
 const [avgRating, setAvgRating] = useState(null);
 const router = useRouter();

 useEffect(() => {
   const fetchFeedback = async () => {
     try {
       // Resolve `params` if it's a promise
       const resolvedParams = await Promise.resolve(params);

       // Check if `interviewId` exists
       if (resolvedParams?.interviewId) {
         await GetFeedBack(resolvedParams.interviewId);
       } else {
         console.error("Interview ID not found in params");
       }
     } catch (error) {
       console.error("Error resolving params or fetching feedback:", error);
     }
   };

   fetchFeedback();
 }, [params]);

 /**
  * Fetch feedback from the database and calculate the average rating
  */
 const GetFeedBack = async (interviewId) => {
   try {
     const result = await db
       .select()
       .from(UserAnswer)
       .where(eq(UserAnswer.mockIdRef, interviewId))
       .orderBy(UserAnswer.id);

     setFeedbackList(result);

     // Calculate average rating
     if (result.length > 0) {
       const totalRating = result.reduce(
         (sum, item) => sum + Number(item.rating),
         0
       );
       setAvgRating(Math.round(totalRating / result.length));
     } else {
       setAvgRating(null); // No ratings available
     }
   } catch (error) {
     console.error("Error fetching feedback:", error);
   }
 };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating{" "}
            <strong
              className={avgRating < 6 ? "text-red-600" : "text-green-500"}
            >
              {avgRating}/10
            </strong>
          </h2>

          <h2 className="text-sm text-gray-200">
            Find below interview question with correct answer, Your answer and
            feedback for improvement{" "}
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex items-center justify-between gap-7 w-full">
                  {item.question} <ChevronsUpDownIcon className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col g-2">
                    <h2 className="text-red-600 p-2 rounded-lg">
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900 ">
                      <strong>Your Answer: </strong> {item.userAns}{" "}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900 mt-2">
                      <strong>Correct Answer: </strong> {item.correctAns}{" "}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary mt-2">
                      <strong>Feedback: </strong> {item.feedback}{" "}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}

export default Feedback;
