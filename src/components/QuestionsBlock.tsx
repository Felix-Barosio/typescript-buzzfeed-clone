import React, { forwardRef } from "react";
import { Content, Question } from "../../interfaces";
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = ({ 
  quizItem,
  choosenAnswer,
  setChoosenAnswer, 
  unansweredQuestionsIds, 
  setUnansweredQuestionsIds 
}: { 
  quizItem: Content,
  choosenAnswer: string[],
  setChoosenAnswer: Function, 
  unansweredQuestionsIds: number[] | undefined, 
  setUnansweredQuestionsIds: Function 
}, ref: React.LegacyRef<HTMLHeadingElement> | undefined) => {

  return (
    <div>

      <h2 ref={ref} className='title-block'>{quizItem.text}</h2>
      
      <div className="questions-cont">
        {quizItem?.questions.map((question: Question, _index: number) => (
          <QuestionBlock 
            key={_index}
            quizItemId={quizItem.id}
            question={question}
            choosenAnswer={choosenAnswer}
            setChoosenAnswer={setChoosenAnswer} 
            unansweredQuestionsIds={unansweredQuestionsIds} 
            setUnansweredQuestionsIds={setUnansweredQuestionsIds} 
          />
        ))}
      </div>

    </div>
  );
};

export default forwardRef(QuestionsBlock);
