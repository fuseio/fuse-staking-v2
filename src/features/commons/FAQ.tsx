import React from "react";
import FaqQuestion from "./FaqQuestion";

type FAQProps = {
  questions: string[];
  answers: JSX.Element[];
  className?: string;
};

const FAQ = ({ questions, answers, className = "" }: FAQProps) => {
  return (
    <div className={"flex w-full md:flex-col " + className}>
      <div className="w-2/5 md:w-full">
        <p className="text-black font-black text-5xl md:text-3xl md:text-center">
          Frequently
          <br className="md:hidden" /> Asked
          <br className="md:hidden" /> Questions
        </p>
      </div>
      <div className="w-3/5 md:w-full md:mt-8">
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
