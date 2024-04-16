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
import { useCreateFaculty, useGetFaculties } from "@app/hooks/useFaculty";
import TextArea from "antd/es/input/TextArea";
import { useCreateMagazine } from "@app/hooks/useMagazine";
import { FacultyInterface } from "@app/interfaces/Faculty";
import dayjs from "dayjs";

const MagazineCreate = ({
  isModalOpen,
  setIsModalOpen,
  facultyName,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  facultyName: FacultyInterface;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const validator = [
    yupSync(
      yup.object().shape({
        name: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Name",
            })
          ),
        closure_date: yup.date().required(
          i18n.t("VALIDATE.REQUIRED", {
            field: "Closure date",
          })
        ),
      })
    ),
  ] as unknown as Rule[];

  const { mutate: handleCreateMagazine, isPending } = useCreateMagazine();
  const { data: dataFaculties, isLoading, refetch } = useGetFaculties();

  const handleSubmit = async (value: any) => {
    const { closure_date } = value;
    const formattedDate = dayjs(closure_date).format("YYYY-MM-DD");

    await Promise.all([
      handleCreateMagazine({
        ...value,
        closure_date: formattedDate,
        faculty_id: Number(facultyName?.id),
      }),
      setIsModalOpen(false),
      form.resetFields(),
    ]);
  };

  const initialValues = { faculty_id: [facultyName?.id] };

  console.log(facultyName?.id);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title="Create Magazine"
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
            <TextField label="Name" name="name" required rules={validator}>
              <Input placeholder="name" allowClear />
            </TextField>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <TextField
              label="Closure date"
              name="closure_date"
              required
              rules={validator}
            >
              <DatePicker
                placeholder={t("PLACEHOLDER.DATE")}
                format={DATE_FORMAT}
              />
            </TextField>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TextField
              label="Faculty"
              name="faculty_id"
              required
              rules={[
                {
                  required: true,
                  message: t("VALIDATE.REQUIRED", {
                    field: "Faculty",
                  }) as string,
                },
              ]}
            >
              <Select
                allowClear
                disabled
                style={{ width: "100%" }}
                placeholder="Select Faculty"
                filterOption={filterOption}
                options={[{ label: facultyName?.name, value: facultyName?.id }]}
              />
            </TextField>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TextField label={t("INPUT.DESCRIPTION")} name="description">
              <TextArea
                showCount
                maxLength={1000}
                placeholder={t("PLACEHOLDER.DESCRIPTION")}
                style={{ height: 120, resize: "none", padding: "1px 5px" }}
              />
            </TextField>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MagazineCreate;
