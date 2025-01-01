import React from "react";

function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  onQuestionClick,
}) {
  if (!mockInterviewQuestion) return null; // Only render if mockInterviewQuestion exists

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index
                ? "bg-primary text-white" // Custom class for active question
                : "bg-gray-200"
            }`}
            onClick={() => onQuestionClick(index)}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      {activeQuestionIndex !== null && (
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question ||
            "No question available"}
        </h2>
      )}
    </div>
  );
}

export default QuestionsSection;
