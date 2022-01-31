import React, {Component, useState} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz';
import Loader from "../../components/UI/Loader/Loader";
import {WithRouter} from "../../hoc/WithRouter/WithRouter";

class Quiz extends Component {
  state = {
    results: {},// {[id]: 'success' : 'error'}
    isFinished: false,
    answerState: null, // {[id]: 'success' : 'error'}
    activeQuestion: 0,
    quiz: [],
    loading: true
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

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.params.id}.json`);
      const quiz = response.data;
      this.setState({
        quiz: quiz,
        loading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.loading
            ? <Loader />
            : this.state.isFinished
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



// async componentDidMount() {
//   console.log(this.props);
//   try {
//     const response = await axios.get(`/quizes/${this.props.match.params.id}`);
//     const quiz = response.data;
//
//     this.state({
//       quiz: quiz,
//       loading: false
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

// const Quiz = () => {
//   const [state, setState] = useState({
//     results: {},// {[id]: 'success' : 'error'}
//     isFinished: false,
//     answerState: null, // {[id]: 'success' : 'error'}
//     activeQuestion: 0,
//     quiz: [],
//     loading: true
//   });
//
//   const onAnswerClickHandler = (answerId) => {
//     if (state.answerState) {
//       const key = Object.keys(state.answerState)[0];
//
//       if(state.answerState[key] === 'success') {
//         return;
//       }
//     }
//
//     const question = state.quiz[state.activeQuestion];
//     const results = state.results;
//
//     if(question.rightAnswerId === answerId) {
//       if(!results[question.id]) {
//         results[question.id] = 'success'
//       }
//
//       setState({
//         answerState: {[answerId]: 'success'},
//         results
//       });
//
//       const timeout = window.setTimeout(() => {
//         if (isQuizFinished()) {
//           setState({
//             isFinished: true
//           });
//         } else {
//           setState({
//             activeQuestion: state.activeQuestion + 1,
//             answerState: null
//           });
//         }
//
//         window.clearTimeout(timeout);
//       }, 1000);
//     } else {
//       results[question.id] = 'error';
//
//       setState({
//         answerState: {[answerId]: 'error'},
//         results
//       });
//     }
//   }
//
//   const isQuizFinished = () => {
//     return state.activeQuestion + 1 === state.quiz.length;
//   }
//
//   const retryHandler = () => {
//     setState({
//       isFinished: false,
//       answerState: null, // {[id]: 'success' : 'error'}
//       activeQuestion: 0,
//       results: {}
//     })
//   }
//
//   return (
//     <div className={classes.Quiz}>
//       <div className={classes.QuizWrapper}>
//         <h1>Ответьте на все вопросы</h1>
//         {
//           state.loading
//             ?
//             <Loader />
//             :
//             this.state.isFinished
//               ? <FinishedQuiz
//                 results={state.results}
//                 quiz={state.quiz}
//                 onRetry={retryHandler}/>
//               : <ActiveQuiz
//                 answers={state.quiz[state.activeQuestion].answers}
//                 question={state.quiz[state.activeQuestion].question}
//                 onAnswerClick={onAnswerClickHandler}
//                 quizLength={state.quiz.length}
//                 answerNumber={state.activeQuestion + 1}
//                 state={state.answerState} />
//         }
//       </div>
//     </div>
//   );
// }

export default WithRouter(Quiz);
