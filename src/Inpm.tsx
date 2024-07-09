import React from 'react';

interface MyComponentProps {
  text: string;
}

const Inpm: React.FC<MyComponentProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default Inpm;
