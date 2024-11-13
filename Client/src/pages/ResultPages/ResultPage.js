import React from "react";
import { RESET_STATE } from "../../redux/features/product/orderSlice";
import { Button, Result, Typography } from "antd";
import { CloseCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const { Paragraph, Text } = Typography;

export const PageSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGotoorder = () => {
    navigate("/orders");
    dispatch(RESET_STATE());
  };
  const handletohome = () => {
    navigate("/");
    dispatch(RESET_STATE());
  };
  return (
    <>
      <Result
        status="success"
        title="Successfully Purchased"
        subTitle={""}
        extra={[
          <Button type="primary" onClick={() => handleGotoorder()}>
            Go to Orders
          </Button>,
          <Button onClick={() => handletohome()}>Continue Shopping?</Button>,
        ]}
      />
    </>
  );
};
export const PageInfo = ({ discription, buttonName }) => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        title={discription}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {buttonName}
          </Button>
        }
      />
    </>
  );
};

export const PageWarnings = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="warning"
        title="There are some problems with your operation."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export const Page403 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" key="/">
            Back Home
          </Button>
        }
      />
    </>
  );
};

export const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist. please go back"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export const Page500 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export const pageSubmissonFailed = () => {
  return (
    <>
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account has been frozen. <a>Thaw immediately &gt;</a>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account is not yet eligible to apply. <a>Apply Unlock &gt;</a>
          </Paragraph>
        </div>
      </Result>
    </>
  );
};

export const PageALLGood = () => {
  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the operations!"
        extra={<Button type="primary">Next</Button>}
      />
    </>
  );
};
