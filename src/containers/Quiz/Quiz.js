import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {},// {[id]: 'success' : 'error'}
    isFinished: false,
    answerState: null, // {[id]: 'success' : 'error'}
    activeQuestion: 0,
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 1,
        id: 0,
        answers: [
          { id: 0, text: 'Черный' },
          { id: 1, text: 'Синий' },
          { id: 2, text: 'Красный' },
          { id: 3, text: 'Зеленый' }
        ],
      },
      {
        question: 'В каком году основали Санкт-Петербург?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          { id: 0, text: '1700' },
          { id: 1, text: '1705' },
          { id: 2, text: '1703' },
          { id: 3, text: '1803' }
        ],
      }
    ]
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if(this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if(question.rightAnswerId === answerId) {
      if(!results[question.id]) {
          results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';

      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      isFinished: false,
      answerState: null, // {[id]: 'success' : 'error'}
      activeQuestion: 0,
      results: {}
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}/>
              : <ActiveQuiz
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  state={this.state.answerState} />
          }
        </div>
      </div>
    );
  }
}

export default Quiz;
