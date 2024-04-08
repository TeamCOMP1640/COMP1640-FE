import { Col, Form, Input, Row, Select } from "antd";
import { Rule } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import DatePicker from "@app/components/atoms/DatePicker/DatePicker";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { DATE_FORMAT } from "@app/constant/date-time";
import { yupSync } from "@app/helpers/yupSync";
import { useGetAccountsNoPaginate, useGetCourseNoPaginate } from "@app/hooks";
import { useCreateWorkshop } from "@app/hooks/useWorkshop";
import { CourseInterface } from "@app/interfaces/Course";
import { RangePickerProps } from "antd/es/date-picker";

const WorkshopCreate = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const validator = [
    yupSync(
      yup.object().shape({
        title: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: i18n.t("WORKSHOP.NAME"),
            }) as string
          ),
        speaker: yup.string().required(
          i18n.t("VALIDATE.REQUIRED", {
            field: i18n.t("WORKSHOP.SPEAKER"),
          }) as string
        ),
        date: yup.date().required(
          i18n.t("VALIDATE.REQUIRED", {
            field: i18n.t("WORKSHOP.DATE"),
          })
        ),
      })
    ),
  ] as unknown as Rule[];

  const { mutate: handleCreateWorkshop } = useCreateWorkshop();
  const { data: dataCourses } = useGetCourseNoPaginate();
  const { data } = useGetAccountsNoPaginate();

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().subtract(1, "day").endOf("day");
  };

  const handleSubmit = async (value: any) => {
    const { date } = value;
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    await Promise.all([
      handleCreateWorkshop({ ...value, date: formattedDate }),
      setIsModalOpen(false),
      form.resetFields(),
    ]);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title={t("WORKSHOP.CREATE_WORKSHOP")}
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
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <TextField
              label={t("INPUT.NAME")}
              name="title"
              required
              rules={validator}
            >
              <Input placeholder={t("PLACEHOLDER.NAME")} allowClear />
            </TextField>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <TextField
              label={t("INPUT.SPEAKER")}
              name="speaker"
              required
              rules={validator}
            >
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder={t("PLACEHOLDER.SPEAKER")}
                optionFilterProp="children"
                filterOption={filterOption}
                options={data?.data?.map(
                  (data: { id: string; name: string }) => ({
                    value: data.id,
                    label: data.name,
                  })
                )}
              />
            </TextField>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <TextField
              label={t("INPUT.DATE")}
              name="date"
              required
              rules={validator}
            >
              <DatePicker
                placeholder={t("PLACEHOLDER.DATE")}
                format={DATE_FORMAT}
                disabledDate={disabledDate}
              />
            </TextField>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <TextField
              label={t("INPUT.COURSES")}
              name="courses"
              required
              rules={[
                {
                  required: true,
                  message: t("VALIDATE.REQUIRED", {
                    field: t("WORKSHOP.COURSES"),
                  }) as string,
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder={t("PLACEHOLDER.COURSES")}
                filterOption={filterOption}
                options={dataCourses?.map((item: CourseInterface) => ({
                  value: item.id,
                  label: item.name,
                }))}
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

export default WorkshopCreate;
