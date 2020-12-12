export const randomizeArray = (array: any[number | string]) =>
  [...array].sort(() => Math.random() - 0.5);

  export const grabQuizQuestions = async (
    total_questions: 10
  ) => {
    const url = `https://opentdb.com/api.php?amount=${total_questions}&type=multiple`;
    const data = await (await fetch(url)).json();
    return data.results.map((quizprops: any) => ({
      ...quizprops,
      answers: randomizeArray([...quizprops.incorrect_answers, quizprops.correct_answer]),
    }));
  };

  export const startJob = async () => { 
    const newQuestions = await grabQuizQuestions(10)
    return newQuestions
  };