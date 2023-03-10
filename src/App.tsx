import React, { createRef, useEffect, useState } from "react";
import Title from "./components/Title";
import { Content, QuizData } from "../interfaces";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>();
  const [choosenAnswer, setChoosenAnswer] = useState<string[]>([]);
  const [unansweredQuestionsIds, setUnansweredQuestionsIds] = useState<number[] | undefined>([])
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  type ReduceType = {
    id?: {}
  }

  const refs = unansweredQuestionsIds?.reduce<ReduceType | any>((acc, id) => {
    acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>()
    return acc
  }, {})

  const answerRef = createRef<HTMLDivElement | null>()

  // console.log(refs)

  // console.log(choosenAnswer)

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/quiz-item");
      const json = await response.json();
      setQuiz(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(quiz);

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({id} :Content) => id)
    setUnansweredQuestionsIds(unansweredIds)
  }, [quiz])

  // console.log(unansweredQuestionsIds)


  useEffect(() => {

    if(choosenAnswer.length > 0 && unansweredQuestionsIds){
      if (showAnswer && answerRef.current){
        answerRef.current.scrollIntoView({behavior: 'smooth'})
      }

      if (unansweredQuestionsIds.length <= 0 && choosenAnswer.length >= 1){
        setShowAnswer(true)
        // const answer = document.getElementById('answer')
        // answer?.scrollIntoView({ behavior: 'smooth'})
      } else{
        const highestId = Math.min(...unansweredQuestionsIds)
        refs[highestId].current.scrollIntoView({behavior: 'smooth'})
      }


      // const highestElem = document.getElementById(String(highestId))
      // highestElem?.scrollIntoView({ behavior: 'smooth' })
    }

  }, [unansweredQuestionsIds, choosenAnswer.length, showAnswer, answerRef.current, refs])


  return (
    <div className="App">

      <Title title={quiz?.title} subtitle={quiz?.subtitle} />

      {refs && quiz?.content.map((content: Content) => (
        <QuestionsBlock 
          key={content.id} 
          quizItem={content} 
          choosenAnswer={choosenAnswer} 
          setChoosenAnswer={setChoosenAnswer} 
          unansweredQuestionsIds={unansweredQuestionsIds} 
          setUnansweredQuestionsIds={setUnansweredQuestionsIds}
          ref={refs[content.id]}
        />
      ))}

      {showAnswer && 
        <AnswerBlock 
          answerOptions={quiz?.answers} 
          chosenAnswers={choosenAnswer} 
          ref={answerRef}
        />
      }
      
    </div>
  );
};

export default App;
