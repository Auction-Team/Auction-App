import { Col, Row } from "antd";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { t } from "i18next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import accountServices from "../api/services/accountServices";
import authServices from "../api/services/authServices";
import { AlertErrorPopup, AlertPopup } from "../components/Alert";
import { Input, InputPassword } from "../components/customField";
import ThreeDotsLoading from "../components/ThreeLoading";
import { setToken, setUserProfile } from "../redux/slices/accountSlice";
import { isNotEmpty } from "../utils/utils";
import { YupValidations } from "../utils/validate";
const { findUser } = accountServices;
const { login } = authServices;
function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      email: YupValidations.email,
      password: YupValidations.password,
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      const response = await login({ email, password });
      console.log({ response });
      showNotification(response.success);
      if (isNotEmpty(response)) {
        setLoading(false);
      }
      if (response.success === true) {
        dispatch(setToken(response.access_token));
      }
    },
  });
  const showNotification = (success) => {
    switch (success) {
      case false:
        return AlertErrorPopup({
          title: t("popup.login.error"),
          text: t("popup.login.error"),
        });
      case true:
        setTimeout(() => {
          navigate("/");
        }, 5000);
        return AlertPopup({
          title: t("popup.login.success"),
          text: t("popup.login.success"),
        });
      default:
        return null;
    }
  };
  const { handleSubmit } = formikLogin;
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-400">
      <FormikProvider value={formikLogin}>
        <Form className="auth-form" onSubmit={handleSubmit}>
          <Row className="leading-8">
            <h1 className="auth-title mb-2">{t("pages.login")}</h1>
          </Row>
          <Row
            align="middle"
            style={{
              height: "auto",
              display: "flex",
              alignContent: "center",
            }}
            gutter={[0, 8]}
          >
            <Col flex={4}>
              <Field component={Input} name="email" label="Email" />
            </Col>
          </Row>
          <Row
            align="middle"
            style={{
              height: "auto",
              display: "flex",
              alignContent: "center",
            }}
            gutter={[0, 8]}
          >
            <Col flex={4}>
              <Field
                component={InputPassword}
                name="password"
                label={t("user.password")}
              />
            </Col>
          </Row>
          <Col span={24}>
            <button className={"primary-button"} type="submit">
              {loading ? <ThreeDotsLoading /> : t("pages.login")}
            </button>
          </Col>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default Login;
