import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Timeline, Icon, List, Button } from 'antd';

import formatDate from '../../../../../utilities/dateTimeFormatter';

const loadMore = (onLoadMore, loading, initLoading, list) =>
  !isEmpty(list) &&
  !initLoading &&
  !loading && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={() => onLoadMore()}>Loading more</Button>
    </div>
  );

const description = (commit, author) => (
  <div>
    <p>Commited {formatDate(commit.committer.date, 'relative')}</p>
    <h4>{commit.message}</h4>
    <div>
      {!isEmpty(author) ? (
        <img
          src={author.avatar_url}
          alt="user"
          style={{ width: 23, borderRadius: 5 }}
        />
      ) : (
        <Icon type="user" />
      )}
      &nbsp;{author ? author.login : commit.author.name}
    </div>
  </div>
);

const CommitsTimeline = ({ list, onLoadMore, initLoading, loading }) => (
  <List
    bordered={false}
    itemLayout="horizontal"
    loadMore={loadMore(onLoadMore, loading, initLoading, list)}
    dataSource={list}
    loading={initLoading}
    renderItem={({ commit, commit: { url = '' }, author }) => (
      <Timeline.Item key={url}>{description(commit, author)}</Timeline.Item>
    )}
  />
);

CommitsTimeline.propTypes = {
  list: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  initLoading: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CommitsTimeline;
