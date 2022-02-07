import React, {Component, useState} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {WithRouter} from "../../hoc/WithRouter/WithRouter";
import {connect} from "react-redux";
import {fetchQuizById, fetchQuizes, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.props.loading || !this.props.quiz
            ? <Loader />
            : this.props.isFinished
              ? <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.retryQuiz}/>
              : <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuestion].answers}
                question={this.props.quiz[this.props.activeQuestion].question}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState} />
          }
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    answerState: state.quiz.answerState,
    activeQuestion: state.quiz.activeQuestion,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(WithRouter(Quiz));
