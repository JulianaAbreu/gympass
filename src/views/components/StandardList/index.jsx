import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Icon } from 'antd';
import styled from 'styled-components';

import formatDate from '../../../utilities/dateTimeFormatter';

const Dot = styled.i`
  height: 9px;
  width: 9px;
  background-color: #fa738d;
  border-radius: 50%;
  display: inline-block;
  margin: 0px 2px 0px 13px;
`;

const TextHighLight = styled.span`
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 430;
  color: #686868;
`;

const LanguageItem = styled.span`
  margin-left: 3px;
`;

const CardContainer = styled(Card)`
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
    transition: 0.5s;
    cursor: pointer;

    div,
    div > span > span {
      color: white;
    }
  }
`;

const StarsCountItem = styled.div`
  margin-top: 10px;

  i {
    color: #f42b52;
  }

  span {
    margin-left: 5px;
    font-weight: 600;
  }
`;

const NameItem = styled.span`
  border-bottom: 5px dashed #9c8085;
`;

const { Meta } = Card;

const onClick = (name, history) => {
  const { push } = history;
  push(`${name}/commits`);
};

const StandardList = ({ data, history }) => (
  <List
    grid={{
      gutter: 24,
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 3,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={({
      id,
      name,
      description,
      language,
      updated_at: updateAt,
      stargazers_count: starsCount,
    }) => (
      <List.Item key={id}>
        <CardContainer
          style={{ minHeight: 210 }}
          onClick={() => onClick(name, history)}
        >
          <Meta
            title={
              <div>
                <NameItem>{name}</NameItem>
                {language && (
                  <LanguageItem>
                    <Dot />
                    <TextHighLight>{language}</TextHighLight>
                  </LanguageItem>
                )}
              </div>
            }
            description={
              <p>
                <Icon type="calendar" /> Updated&ensp;
                {formatDate(updateAt, 'relative')}
              </p>
            }
          />
          <span>{description}</span>
          <StarsCountItem>
            <Icon type="star" theme="filled" />
            <span>{starsCount}</span>
          </StarsCountItem>
        </CardContainer>
      </List.Item>
    )}
  />
);

StandardList.propTypes = {
  history: PropTypes.object.isRequired,

  data: PropTypes.array.isRequired,
};

export default StandardList;
