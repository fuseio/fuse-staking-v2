import React from "react";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";

type FaqQuestionProps = {
  question: string;
  answer: string;
  className?: string;
};

const FaqQuestion = ({
  question,
  answer,
  className = "",
}: FaqQuestionProps) => {
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  return (
    <div
      className="flex justify-start border-t-2 px-5 py-7 items-start cursor-pointer"
      onClick={() => {
        setIsAnswerVisible(!isAnswerVisible);
      }}
    >
      <span>
        {isAnswerVisible ? (
          <img src={minus} alt="minus" width="40px"  className="mt-1" />
        ) : (
          <img src={plus} alt="plus" width="16px" />
        )}
      </span>
      <span className="flex flex-col ms-6">
        <span className="text-lg/[18px] font-bold">{question}</span>
        {isAnswerVisible && (
          <span className="text-text-dark-gray font-normal text-base mt-3">
            {answer}
          </span>
        )}
      </span>
    </div>
  );
};

export default FaqQuestion;
