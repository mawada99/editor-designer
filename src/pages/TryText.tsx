import React from 'react';

interface MyComponentProps {
  text: string;
}

const TryText: React.FC<MyComponentProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default TryText;
