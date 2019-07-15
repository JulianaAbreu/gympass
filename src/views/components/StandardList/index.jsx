import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import styled from 'styled-components';

import formatDate from '../../../utilities/dateTimeFormatter';

// primary-color: #f42b52;

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

const NameItem = styled.span`
  border-bottom: 5px solid #f42b52;
`;

const { Meta } = Card;

const StandardList = ({ data }) => (
  <List
    grid={{ gutter: 24, column: 3 }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item key={item.id}>
        <CardContainer style={{ minHeight: 200 }}>
          <Meta
            title={
              <div>
                <NameItem>{item.name}</NameItem>
                {item.language && (
                  <LanguageItem>
                    <Dot />
                    <TextHighLight>{item.language}</TextHighLight>
                  </LanguageItem>
                )}
              </div>
            }
            description={
              <p>Updated {formatDate(item.updated_at, 'relative')}</p>
            }
          />

          {item.description}
        </CardContainer>
      </List.Item>
    )}
  />
);

StandardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default StandardList;
