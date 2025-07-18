import { Modal, Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./LoginModal.scss";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: any) => void;
  onSwitchToSignup?: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const LoginModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToSignup,
}: LoginModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  const handleSubmit = async (values: LoginFormData) => {
    setLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: "include", // Important for session cookies
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          // Handle validation errors
          if (data.validationErrors && data.validationErrors.length > 0) {
            const errors = data.validationErrors.map((err: any) => ({
              field: err.param || err.path,
              message: err.msg,
            }));
            setValidationErrors(errors);
          } else {
            setError(data.message || "Invalid email or password.");
          }
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
        return;
      }

      // Login successful
      console.log("Login successful:", data);

      // Call success callback with user data
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      // Close modal
      onClose();

      // Reset form
      form.resetFields();
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setError(null);
    setValidationErrors([]);
    onClose();
  };

  const getFieldError = (fieldName: string) => {
    const fieldError = validationErrors.find((err) => err.field === fieldName);
    return fieldError ? fieldError.message : null;
  };

  return (
    <Modal
      title="Login to Your Garden"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={400}
      className="login-modal"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item
          label="Email"
          name="email"
          validateStatus={getFieldError("email") ? "error" : ""}
          help={getFieldError("email")}
          rules={[
            {
              required: true,
              message: "Please enter your email address",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input type="email" placeholder="Enter your email" size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateStatus={getFieldError("password") ? "error" : ""}
          help={getFieldError("password")}
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              min: 5,
              message: "Password must be at least 5 characters long",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            size="large"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            block
            className="login-button"
            onClick={() => {
              console.log("🔘 Button clicked, triggering form submit");
              form.submit();
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>

        <div className="login-modal-footer">
          <div className="forgot-password">
            <a href="/reset">Forgot your password?</a>
          </div>
          <div className="signup-link">
            Don't have an account?{" "}
            <span onClick={onSwitchToSignup} className="modal-link">
              Sign up
            </span>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default LoginModal;
