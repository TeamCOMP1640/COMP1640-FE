import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Rule } from "antd/es/form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { yupSync } from "@app/helpers/yupSync";
import { useCreateAcademic, useCreateAccount } from "@app/hooks";
import { DATE_FORMAT } from "@app/constant/date-time";
import { useAssignStudent, useCreateFaculty } from "@app/hooks/useFaculty";
import { FacultyInterface } from "@app/interfaces/Faculty";
import { ID } from "@app/constant/auth";
import { getLocalStorage } from "@app/config/storage";

const FacultyAssign = ({
  isModalOpen,
  setIsModalOpen,
  dataDetail,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  dataDetail?: FacultyInterface;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const userId = getLocalStorage(ID);
  const validator = [
    yupSync(
      yup.object().shape({
        enrolment_key: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Enrolment Key",
            })
          ),
      })
    ),
  ] as unknown as Rule[];

  const { mutate: handleAssignStudent, isPending } = useAssignStudent(
    dataDetail?.id || ""
  );

  const handleSubmit = async (value: any) => {
    await Promise.all([
      handleAssignStudent({ ...value, userId: Number(userId) }),
      setIsModalOpen(false),
      form.resetFields(),
    ]);
  };

  return (
    <Modal
      title="Assign to Faculty"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={() => {
        setIsModalOpen(false), form.resetFields();
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
      >
        <Row gutter={[8, 8]} className="px-15px py-1rem">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TextField
              label="Enrolment Key"
              name="enrolment_key"
              required
              rules={validator}
            >
              <Input placeholder="Enrolment Key" allowClear />
            </TextField>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FacultyAssign;
