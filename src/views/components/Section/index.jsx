import React from 'react';
import PropTypes from 'prop-types';
import { Card, Spin, Icon } from 'antd';

import './style.less';

const spinIcon = <Icon type="loading" />;
const cardHeader = (title, icon) => (
  <div>
    <span>{title}</span>
    <Icon style={{ marginLeft: 5 }} type={icon} />
  </div>
);

const Section = ({
  title,
  icon,
  className,
  cardStyle,
  children,
  isLoading,
}) => {
  const styleProp = cardStyle ? { style: { ...cardStyle } } : {};
  return (
    <Spin
      indicator={spinIcon}
      spinning={isLoading}
      tip="Carregando"
      delay={500}
    >
      <Card
        bordered={false}
        title={cardHeader(title, icon)}
        className={`content${className ? ` ${className}` : ''}`}
        {...styleProp}
      >
        {children}
      </Card>
    </Spin>
  );
};

Section.propTypes = {
  t: PropTypes.func,

  isLoading: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  cardStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

Section.defaultProps = {
  isLoading: false,
};

export default Section;
