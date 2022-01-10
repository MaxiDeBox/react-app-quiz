import React from "react";
import classes from "./AnswersList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {
        props.answers.map((answer, idx) => {
          return (
            <AnswerItem
              key={idx}
              answer={answer}
              onAnswerClick={props.onAnswerClick} />
          );
        })
      }
    </ul>
  );
}

export default AnswersList;
