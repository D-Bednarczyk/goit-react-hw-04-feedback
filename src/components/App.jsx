import { useState } from 'react';
import css from './App.module.css';
import { FeedbackOptions } from './FeedbackOptions';
import { Statistics } from './Statistics';
import { Section } from './Section';
import { Notification } from './Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleOnClick = option => {
    switch (option) {
      case 'good':
        return setGood(good + 1);
      case 'neutral':
        return setNeutral(neutral + 1);
      case 'bad':
        return setBad(bad + 1);
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return ((good / countTotalFeedback()) * 100).toFixed(0);
  };

  return (
    <div className={css.main_div}>
      <Section title="Please leave feedback"></Section>
      <div>
        {['good', 'neutral', 'bad'].map((opt, index) => (
          <FeedbackOptions
            key={index}
            options={opt}
            onLeaveFeedback={() => handleOnClick(opt)}
          ></FeedbackOptions>
        ))}
      </div>
      <Section title="Statistics"></Section>
      {!countTotalFeedback() ? (
        <Notification message="There is no feedback"></Notification>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        ></Statistics>
      )}
    </div>
  );
};
