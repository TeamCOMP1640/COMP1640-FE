import { Col, Form, Input, Row, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Rule } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import DatePicker from "@app/components/atoms/DatePicker/DatePicker";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { DATE_FORMAT } from "@app/constant/date-time";
import { yupSync } from "@app/helpers/yupSync";
import {
  useGetAccountsNoPaginate,
  useGetCourseNoPaginate,
  useUpdateAccount,
} from "@app/hooks";
import { useUpdateWorkshop } from "@app/hooks/useWorkshop";
import { CourseInterface } from "@app/interfaces/Course";
import { WorkshopDetailInterface } from "@app/interfaces/workshop.interface";
import { AccountsInterface } from "@app/interfaces/Account";

const AccountUpdate = ({
  isModalOpen,
  setIsModalOpen,
  dataDetail,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  dataDetail?: AccountsInterface;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const validator = [
    yupSync(
      yup.object().shape({
        username: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Username",
            })
          ),
        email: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Email",
            })
          ),
        password: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Password",
            })
          ),
        fullname: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Name",
            })
          ),
      })
    ),
  ] as unknown as Rule[];

  const { mutate: handleUpdateWorkshop } = useUpdateWorkshop(
    dataDetail?.id ?? ""
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, dataDetail]);

  const { mutate: handleUpdateAccount, isPending } = useUpdateAccount(
    dataDetail?.id ?? ""
  );

  const handleSubmit = async (value: any) => {
    await Promise.all([
      handleUpdateAccount({ ...value }),
      setIsModalOpen(false),
      form.resetFields(),
    ]);
  };

  const initialValues = dataDetail
    ? {
        fullname: dataDetail.fullname,
        username: dataDetail.username,
        email: dataDetail.email,
        phone: dataDetail.phone,
        role: dataDetail.role,
      }
    : {};

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {dataDetail && (
        <Modal
          title={t("WORKSHOP.UPDATE_WORKSHOP")}
          open={isModalOpen}
          onOk={form.submit}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
          }}
          width={1000}
        >
          <Form
            className="px-6 pt-6"
            onFinish={handleSubmit}
            form={form}
            id="form-applications"
            labelAlign="left"
            wrapperCol={{ span: 24 }}
            initialValues={initialValues}
          >
            <Row gutter={[8, 8]} className="px-15px py-1rem">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField
                  label="Fullname"
                  name="fullname"
                  required
                  rules={validator}
                >
                  <Input placeholder="Name" allowClear />
                </TextField>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField
                  label="Username"
                  name="username"
                  required
                  rules={validator}
                >
                  <Input placeholder={t("PLACEHOLDER.NAME")} allowClear />
                </TextField>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField
                  label="Email"
                  name="email"
                  required
                  rules={validator}
                >
                  <Input placeholder="Enter Email" allowClear />
                </TextField>
              </Col>

              {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField
                  label="Password"
                  name="password"
                  required
                  rules={validator}
                >
                  <Input placeholder="Enter Password" allowClear />
                </TextField>
              </Col> */}
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField
                  label="Role"
                  name="role"
                  required
                  rules={[
                    {
                      required: true,
                      message: t("VALIDATE.REQUIRED", {
                        field: "Role",
                      }) as string,
                    },
                  ]}
                >
                  <Select
                    // mode=""
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Role"
                    filterOption={filterOption}
                    options={[
                      {
                        label: "Marketing Manager",
                        value: "marketing_manager",
                      },
                      {
                        label: "Marketing Coordinator",
                        value: "marketing_coordinator",
                      },
                      { label: "Student", value: "student" },
                      { label: "Guest", value: "guest" },
                    ]}
                  />
                </TextField>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField label="Phone" name="phone">
                  <Input placeholder="Enter Phone" allowClear />
                </TextField>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AccountUpdate;
