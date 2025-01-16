import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSections({ activeQuestionIndex, mockInterViewQuestion }) {
  console.log("moc", mockInterViewQuestion);
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert(
        "Sorry, Your browser does not support text-to-speech (recommended browser Chrome)."
      );
    }
  };

  const questions = Array.isArray(mockInterViewQuestion?.interviewQuestions)
    ? mockInterViewQuestion.interviewQuestions
    : [];

  console.log("questions", questions);

  return (
    <div className="p-5 border rounded-lg my-10">
      {questions.length > 0 ? (
        <>
          {/* Question list */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center">
            {questions.map((question, index) => (
              <h2
                key={index}
                className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index && "!bg-primary text-white"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
          </div>

          {/* Active question */}
          <h2 className="my-5 text-sm md:text-lg">
            <strong>Q.</strong>{" "}
            {questions[activeQuestionIndex]?.question ||
              "No Question Available"}
          </h2>

          {/* Text-to-Speech */}
          <Volume2
            className="cursor-pointer"
            onClick={() =>
              textToSpeech(questions[activeQuestionIndex]?.question || "")
            }
          />

          {/* Note Section */}
          <div className="border rounded-lg p-5 bg-blue-100 mt-20">
            <h2 className="flex gap-2 items-center text-blue-700">
              <Lightbulb />
              <strong>Note:</strong>
            </h2>
            <h2 className="my-2 text-sm text-blue-700">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
                "No additional notes available"}
            </h2>
          </div>
        </>
      ) : (
        // Handle case where no questions are available
        <h2 className="text-center text-red-500">
          No questions available to display.
        </h2>
      )}
    </div>
  );
}

export default QuestionsSections;
