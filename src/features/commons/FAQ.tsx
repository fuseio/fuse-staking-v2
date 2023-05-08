import React from "react";
import FaqQuestion from "./FaqQuestion";

type FAQProps = {
  questions: string[];
  answers: string[];
  className?: string;
};

const FAQ = ({ questions, answers, className = "" }: FAQProps) => {
  return (
    <div className={"flex w-full " + className}>
      <div className="w-2/5">
        <span className="text-black font-black text-5xl">
          Frequently
          <br /> Asked
          <br /> Questions
        </span>
      </div>
      <div className="w-3/5">
        {questions.map((question, index) => (
          <FaqQuestion
            key={index}
            question={question}
            answer={answers[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
