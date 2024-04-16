import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Rule } from "antd/es/form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { yupSync } from "@app/helpers/yupSync";
import {
  useCreateAcademic,
  useCreateAccount,
  useUpdateAcademic,
} from "@app/hooks";
import { DATE_FORMAT } from "@app/constant/date-time";
import { AcademicInterface } from "@app/interfaces/Academic";
import dayjs from "dayjs";
import { useEffect } from "react";

const AcademicUpdate = ({
  isModalOpen,
  setIsModalOpen,
  dataDetail,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  dataDetail?: AcademicInterface;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const validator = [
    yupSync(
      yup.object().shape({
        year: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Year",
            })
          ),
        final_closure_date: yup.date().required(
          i18n.t("VALIDATE.REQUIRED", {
            field: "Final closure date",
          })
        ),
      })
    ),
  ] as unknown as Rule[];

  const initialValues = dataDetail
    ? {
        year: dataDetail.year,
        final_closure_date: dayjs(dataDetail.final_closure_date),
      }
    : {};

  const { mutate: handleUpdateAcademic, isPending } = useUpdateAcademic(
    dataDetail?.id ?? ""
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, dataDetail]);

  const handleSubmit = async (value: any) => {
    const { final_closure_date } = value;
    const formattedDate = dayjs(final_closure_date).format("YYYY-MM-DD");
    await Promise.all([
      handleUpdateAcademic({ ...value, final_closure_date: formattedDate }),
      setIsModalOpen(false),
      form.resetFields(),
    ]);
  };

  return (
    <>
      {dataDetail && (
        <Modal
          title="Create Academic Year"
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
            initialValues={initialValues}
          >
            <Row gutter={[8, 8]} className="px-15px py-1rem">
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField label="Year" name="year" required rules={validator}>
                  <Input placeholder="year" allowClear />
                </TextField>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextField
                  label="Final closure date"
                  name="final_closure_date"
                  required
                  rules={validator}
                >
                  <DatePicker
                    placeholder={t("PLACEHOLDER.DATE")}
                    format={DATE_FORMAT}
                  />
                </TextField>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AcademicUpdate;
