import React from 'react';
import { Question } from '../../interfaces';

const QuestionBlock = ({
  quizItemId,
  question,
  choosenAnswer,
  setChoosenAnswer, 
  unansweredQuestionsIds, 
  setUnansweredQuestionsIds

}: {
  quizItemId: number;
  question: Question;
  choosenAnswer: string[]
  setChoosenAnswer: Function
  unansweredQuestionsIds: number[] |undefined
  setUnansweredQuestionsIds: Function
}) =>  {

  const hancleClick = () => {

    setChoosenAnswer((prevState: string[]) => [...prevState, question.text])
    setUnansweredQuestionsIds(unansweredQuestionsIds?.filter((id: number) => id !== quizItemId))
  }

  const validAnswer = !choosenAnswer?.includes(question.text) && !unansweredQuestionsIds?.includes(quizItemId)

  return (
    <div>
      <button
      className='question-block'
      onClick={hancleClick}
      disabled={validAnswer}
      >
        <img src={question.image} alt={question.alt} />
        <h4>{question.text}</h4>
        <p>
          <a href={question.image}>{question.credit} </a>
          <a href='https://www.unsplash.com'>Unsplash</a>
        </p>

      </button>
    </div>
  );
}

export default QuestionBlock;
