import React, { useState } from 'react';
import {Modal,Steps, Form, Input, Button, message, Spin } from 'antd';
import ApiService from '../../Services/Api/ApiService';
import { setEmail,getEmail } from '../../utils/storage/tokenUtils';
const { Step } = Steps;

const ResetPassword: React.FC<{isVisible: boolean; onClose: () => void;}> = ({isVisible, onClose}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (values: any) => {
    try {
        setIsLoading(true);
        await ApiService.requestPasswordReset(values.email);
        message.success('A verification code has been sent to your email.');
        setEmail(values.email); // Store the email in localStorage
        setCurrentStep(currentStep + 1);
      } catch (error) {
        message.error('Failed to send verification code.');
      }finally {
        setIsLoading(false); // Stop loading regardless of the outcome
      }
  };

  const handleCodeVerificationSubmit = async(values: any) => {
    try {
        setIsLoading(true);
        const email = getEmail(); // Retrieve the email from localStorage
        await ApiService.verifyResetCode(email!, values.code);
        message.success('Verification successful.');
        setCurrentStep(currentStep + 1);
      } catch (error) {
        message.error('Verification failed.');
      }finally {
        setIsLoading(false); // Stop loading
      }
  };

  const handleNewPasswordSubmit =async (values: any) => {
    try {
        setIsLoading(true); 
        const email = getEmail(); // Retrieve the email from localStorage
        await ApiService.setNewPassword(email!, values.newPassword);
        message.success('Your password has been updated successfully.');
        onClose(); // Close the modal and potentially clear the email from localStorage
      } catch (error) {
        message.error('Failed to update password.');
      }finally {
        setIsLoading(false); // Stop loading
      }
  };
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form onFinish={handleEmailSubmit}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit"className=" bg-lime-500">
                Submit Email
              </Button>
            </Form.Item>
          </Form>
        );
      case 1:
        return (
          <Form onFinish={handleCodeVerificationSubmit}>
            <Form.Item name="code" rules={[{ required: true, message: 'Please input the verification code!' }]}>
              <Input placeholder="Verification Code" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit"className=" bg-lime-500">
                Verify Code
              </Button>
            </Form.Item>
          </Form>
        );
      case 2:
        return (
            <Form
            name="newPasswordForm"
            onFinish={handleNewPasswordSubmit}
          >
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be at least 6 characters long!' } // Example of additional validation rule
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item
              name="confirmNewPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-lime-500">
                Set New Password
              </Button>
            </Form.Item>
          </Form>
        );
      default:
        return null;
    }
  };
  return (
    <Modal title="Reset Password" visible={isVisible} onCancel={onClose} footer={null}>
        <Spin spinning={isLoading}>
      <Steps current={currentStep}>
        <Step title="Submit Email" />
        <Step title="Verify Code" />
        <Step title="Set New Password" />
      </Steps>
      <div style={{ marginTop: '24px' }}>
        {renderCurrentStep()}
      </div>
      </Spin>
    </Modal>
  );
};

export default ResetPassword;