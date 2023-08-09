import React from "react";
import plus from "../../assets/plus.svg";
import minus from "../../assets/minus.svg";
import { motion } from "framer-motion";

type FaqQuestionProps = {
  question: string;
  answer: JSX.Element;
  className?: string;
};

// const faq = {
//   closed: {
//     scale: 0,
//     transition: {
//       delay: 0.15,
//     },
//   },
//   open: {
//     scale: 1,
//     transition: {
//       type: "spring",
//       duration: 0.4,
//     },
//   },
// };

const FaqQuestion = ({
  question,
  answer,
  className = "",
}: FaqQuestionProps) => {
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  return (
    <div className="flex justify-start border-t-2 px-5 py-7 items-start cursor-pointer">
      <div
        className="w-[5%] md:w-1/10"
        onClick={() => {
          setIsAnswerVisible(!isAnswerVisible);
        }}
      >
        {isAnswerVisible ? (
          <img src={minus} alt="minus" className="mt-1" />
        ) : (
          <img src={plus} alt="plus" />
        )}
      </div>
      <span className="flex flex-col w-[95%] md:w-9/10">
        <span
          className="text-lg/[18px] font-bold md:text-base/[18px]"
          onClick={() => {
            setIsAnswerVisible(!isAnswerVisible);
          }}
        >
          {question}
        </span>
        {isAnswerVisible && (
          <motion.span className="text-text-dark-gray font-normal text-base mt-3 md:text-sm">
            <>{answer}</>
          </motion.span>
        )}
      </span>
    </div>
  );
};

export default FaqQuestion;
