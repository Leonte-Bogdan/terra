import { Modal, Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./SignupModal.scss";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupSuccess?: (user: any) => void;
  onSwitchToLogin?: () => void;
}

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const SignupModal = ({
  isOpen,
  onClose,
  onSignupSuccess,
  onSwitchToLogin,
}: SignupModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  const handleSubmit = async (values: SignupFormData) => {
    setLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      const requestBody = {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      console.log("📡 Making API request to /api/auth/signup");
      console.log("📤 Request body:", requestBody);
      console.log("📤 Request body JSON:", JSON.stringify(requestBody));

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
        // Add cache control to prevent 304 responses
        cache: "no-cache",
      });

      console.log("📨 Response status:", response.status);
      console.log("📨 Response ok:", response.ok);
      console.log(
        "📨 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Check if response has content
      const responseText = await response.text();
      console.log("📨 Response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("📨 Response data:", data);
      } catch (e) {
        console.log("📨 Response is not JSON, raw text:", responseText);
        data = { message: responseText };
      }

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
            setError(data.message || "Signup failed. Please try again.");
          }
        } else {
          setError(data.message || "Signup failed. Please try again.");
        }
        return;
      }

      console.log("✅ Signup successful:", data);

      // Call success callback with user data
      if (onSignupSuccess) {
        onSignupSuccess(data.user);
      }

      onClose();

      // Reset form
      form.resetFields();
    } catch (err) {
      console.error("❌ Signup error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("🚪 Modal cancelled");
    form.resetFields();
    setError(null);
    setValidationErrors([]);
    onClose();
  };

  const getFieldError = (fieldName: string) => {
    const fieldError = validationErrors.find((err) => err.field === fieldName);
    return fieldError ? fieldError.message : null;
  };

  const onFinish = (values: SignupFormData) => {
    handleSubmit(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("❌ onFinishFailed called - Form validation failed!");
    console.log("❌ Error info:", errorInfo);
  };

  return (
    <Modal
      title="Join Your Garden"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={400}
      className="signup-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
            {
              pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
              message: "Password cannot contain spaces",
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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          validateStatus={getFieldError("confirmPassword") ? "error" : ""}
          help={getFieldError("confirmPassword")}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
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
            className="signup-button"
            onClick={() => {
              console.log("🔘 Button clicked, triggering form submit");
              form.submit();
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form.Item>
        <div className="signup-modal-footer">
          <div className="login-link">
            Already have an account?{" "}
            <span onClick={onSwitchToLogin} className="modal-link">
              Login
            </span>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default SignupModal;
