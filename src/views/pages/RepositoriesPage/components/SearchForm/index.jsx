import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Row, Col, Form, Button, Select } from 'antd';

const SearchForm = ({ form: { getFieldDecorator }, onSubmit, loading }) => (
  <Form style={{ marginBottom: 20 }}>
    <Row display="flex" gutter={24}>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <Form.Item label="Sort">
          {getFieldDecorator('sort')(
            <Select allowClear>
              <Select.Option value="stars">Stars</Select.Option>
              <Select.Option value="forks">Forks</Select.Option>
              <Select.Option value="help-wanted-issues">
                Help-wanted-issues
              </Select.Option>
              <Select.Option value="updated">Updated</Select.Option>
            </Select>,
          )}
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}>
        <Form.Item label="Direction">
          {getFieldDecorator('direction')(
            <Select allowClear>
              <Select.Option value="asc">Ascending </Select.Option>
              <Select.Option value="desc">Descending </Select.Option>
            </Select>,
          )}
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={4} lg={4} xl={2} xxl={2}>
        <Form.Item style={{ marginTop: 37 }}>
          <Button onClick={onSubmit} type="primary" loading={loading}>
            Search
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

SearchForm.propTypes = {
  form: PropTypes.object.isRequired,

  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(SearchForm);
