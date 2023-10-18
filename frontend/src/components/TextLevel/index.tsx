import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface Props {
    level: number;
    title: string;
}

const TextLevel: React.FC<Props> = ({ level, title }) => {
  let textComponent = null;

  if (level === 1) {
    textComponent = <Title level={1}>{title}</Title>;
  } else if (level === 2) {
    textComponent = <Title level={2}>{title}</Title>;
  } else if (level === 3) {
    textComponent = <Title level={3}>{title}</Title>;
  } else if (level === 4) {
    textComponent = <Title level={4}>{title}</Title>;
  } else if (level === 5) {
    textComponent = <Title level={5}>{title}</Title>;
  }

  return textComponent;
};

export default TextLevel;
