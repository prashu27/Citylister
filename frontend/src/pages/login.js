import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Row, Spin } from "antd";
import React, { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card
      title="Login with City Lister"
      bordered={false}
      style={{
        width: 500,
        margin: "10% 30%",
        textAlign: "center",
      }}
    >
      <Spin tip="Signing you in...." spinning={loading}>
        <Row>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" style={{ width: "300px" }} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" style={{ width: "300px" }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                fullWidth
                style={{ width: "100px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Spin>
    </Card>
  );
};

export default Login;
