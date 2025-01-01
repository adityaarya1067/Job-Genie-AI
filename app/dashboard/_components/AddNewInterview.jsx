"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(jobExperience, jobDesc, jobPosition);

    const InputPrompt = `
      Job position: ${jobPosition},
      Job Description: ${jobDesc},
      Years of Experience: ${jobExperience},
      Based on the job position, job description, and years of experience,
      give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions
      along with answers in JSON format.
    `;

    const result = await chatSession.sendMessage(InputPrompt);

    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResp));

    setJsonResponse(MockJsonResp);

    const resp = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      })
      .returning({ mockId: MockInterview.mockId });

    console.log("Inserted Id:", resp);

    if (resp) {
      setLoading(false);
      router.push("/dashboard/interview/" + resp[0]?.mockId);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all "
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <h2 className="font-bold text-2xl">
                Tell us more about the Job you are interviewing
              </h2>
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, Job description,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-10">
                    <div>
                      <label>Job Role/Job Position</label>
                      <Input
                        placeholder="Ex. Full Stack Developer"
                        required
                        onChange={(event) => setJobPosition(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-7 my-2">
                    <div>
                      <label>Job Description/Tech Stack (In Short)</label>
                      <Textarea
                        placeholder="Ex. React, Angular, JS, PostgreSQL, etc"
                        required
                        onChange={(event) => setJobDesc(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <div>
                      <label>Years of Experience</label>
                      <Textarea
                        placeholder="Ex. 4"
                        type="number"
                        max="100"
                        required
                        onChange={(event) =>
                          setJobExperience(event.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> 'Generating
                        from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
