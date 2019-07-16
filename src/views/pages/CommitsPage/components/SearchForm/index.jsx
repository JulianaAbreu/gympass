import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import { Row, Col, Form, Input, Button, Select } from 'antd';

const SearchForm = ({
  form: { getFieldDecorator },
  onSubmit,
  branches = [],
  loading,
}) => (
  <Form>
    <Row display="flex" gutter={16}>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <Form.Item label="Branch">
          {getFieldDecorator('sha')(
            <Select allowClear>
              {!isEmpty(branches) &&
                branches.map(({ name }) => (
                  <Select.Option key={name}>{name}</Select.Option>
                ))}
            </Select>,
          )}
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
        <Form.Item label="Path">
          {getFieldDecorator('path')(<Input allowClear />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
        <Form.Item label="Author">
          {getFieldDecorator('author')(<Input allowClear />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={4} xxl={4}>
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
  branches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withForm = Form.create();

export default compose(withForm)(SearchForm);
