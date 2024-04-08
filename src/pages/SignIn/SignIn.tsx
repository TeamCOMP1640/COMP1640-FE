import { Col, Form, Input, Row, Typography } from "antd";
import { Rule } from "antd/lib/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button } from "@app/components/atoms/Button/Button";
import { TextField } from "@app/components/atoms/TextField/TextField";
import i18n from "@app/config/i18n";
import { yupSync } from "@app/helpers/yupSync";
import { useLogin } from "@app/hooks/useAuth";
import { Credentials } from "@app/interfaces/user.interface";
import { RootState } from "@app/redux/store";
import "./SignIn.scss";

const { Password } = Input;
const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [previousValue, setPreviousValue] = useState<Credentials>({
    userName: "",
    password: "",
  });

  const validator = [
    yupSync(
      yup.object().shape({
        userName: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: i18n.t("LOGIN.USERNAME"),
            }) as string
          ),
        password: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: i18n.t("LOGIN.PASSWORD"),
            }) as string
          ),
      })
    ),
  ] as unknown as Rule[];

  const { isAuth } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const { mutate: handleLogin } = useLogin();

  function onSubmit(data: Credentials) {
    handleLogin(data);
  }

  return (
    <div className="sigin-container">
      <Row>
        <Col className="flex fixed items-center justify-center w-55% h-full left-opx top-0px bottom-0px bg-login_bg object-cover backdrop-filter-inherit drop-shadow-[1px_1px_6px_6px_rgba(255, 255, 255)]">
          <div className="w-70% h-4/5 max-w-full bg-cover bg-center bg-login_image" />
        </Col>
        <Col className="absolute w-5/12 h-full right-0px">
          <Row className="h-screen">
            <Col
              xs={24}
              sm={24}
              md={24}
              className="flex items-center justify-center h-full"
            >
              <Form
                form={form}
                onFinish={onSubmit}
                labelWrap={true}
                className="flex flex-col w-full py-0 px-50px max-w-559px content-center justify-center"
              >
                <Typography.Text className="w-full text-#161688 !text-48pix !font-bold h-auto text-center">
                  {t("LOGIN.TITLE")}
                </Typography.Text>
                <Typography.Text className="w-full !pb-4rem text-21pix h-auto text-center">
                  {t("LOGIN.TEXT")}
                </Typography.Text>

                <TextField
                  active={previousValue.userName !== "" ? true : false}
                  label={t("LOGIN.USERNAME")}
                  name="userName"
                  rules={validator}
                  required
                  normalize={(value) => value.trim()}
                >
                  <Input
                    placeholder={t("LOGIN.USERNAME_INPUT")}
                    maxLength={50}
                    onChange={(e) => {
                      setPreviousValue({
                        ...previousValue,
                        userName: e.target.value,
                      });
                    }}
                  />
                </TextField>
                <TextField
                  active={previousValue.password !== "" ? true : false}
                  label={t("LOGIN.PASSWORD")}
                  name="password"
                  rules={validator}
                  required
                >
                  <Password
                    placeholder={t("LOGIN.PASSWORD_INPUT")}
                    maxLength={50}
                    onChange={(e) => {
                      setPreviousValue({
                        ...previousValue,
                        password: e.target.value,
                      });
                    }}
                  />
                </TextField>
                <Button
                  className="h-40px bg-#161688 hover:bg-#5646ff mt-0.5rem"
                  type="primary"
                  block
                  htmlType="submit"
                >
                  {t("LOGIN.BUTTON")}
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
