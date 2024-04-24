import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Rule } from "antd/es/form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { yupSync } from "@app/helpers/yupSync";
import { useGetAcademics, useGetAccounts } from "@app/hooks";
import { useGetFaculties, useUpdateFalculty } from "@app/hooks/useFaculty";
import { AccountsInterface } from "@app/interfaces/Account";
import { FacultyInterface } from "@app/interfaces/Faculty";
import { GetListParams } from "@app/interfaces/common";
import { useEffect, useState } from "react";
import { DATE_FORMAT } from "@app/constant/date-time";
import TextArea from "antd/es/input/TextArea";
import { MagazineInterface } from "@app/interfaces/Magazine";
import { useUpdateMagazine } from "@app/hooks/useMagazine";
import dayjs from "dayjs";
import { AcademicInterface } from "@app/interfaces/Academic";

const MagazineUpdate = ({
  isModalOpen,
  setIsModalOpen,
  dataDetail,
  facultyName,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  dataDetail?: MagazineInterface;
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

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });
  const [filters, setFilters] = useState({
    name: "",
    courseId: "",
  });
  const { data: academicData } = useGetAcademics();
  const paginateOptions: GetListParams = {
    name: filters.name,
    courseId: filters.courseId,
    pageNumber: table.page,
    pageSize: table.take,
  };

  const { data: dataFaculties } = useGetFaculties();

  const initialValues = dataDetail
    ? {
        name: dataDetail.name,
        description: dataDetail.description,
        closure_date: dayjs(dataDetail.closure_date),
        faculty_id: [facultyName?.id],
        academic_id: [dataDetail.academic?.id],
      }
    : {};

  const { mutate: handleUpdateMagazine, isPending } = useUpdateMagazine(
    dataDetail?.id ?? ""
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, dataDetail]);

  const handleSubmit = async (value: any) => {
    const { closure_date } = value;
    const formattedDate = dayjs(closure_date).format("YYYY-MM-DD");
    await Promise.all([
      handleUpdateMagazine({
        ...value,
        closure_date: formattedDate,
        faculty_id: Number(facultyName?.id),
        academic_id: Number(value?.academic_id),
      }),
      setIsModalOpen(false),
      form.resetFields(),
    ]);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {dataDetail && (
        <Modal
          title="Update Magazine"
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
                    options={dataFaculties?.data.map(
                      (item: FacultyInterface) => ({
                        value: item.id,
                        label: item.name,
                      })
                    )}
                  />
                </TextField>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <TextField
                  label="Academic Year"
                  name="academic_id"
                  rules={[
                    {
                      required: true,
                      message: t("VALIDATE.REQUIRED", {
                        field: "Academic",
                      }) as string,
                    },
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Academic"
                    filterOption={filterOption}
                    options={academicData?.data?.map(
                      (item: AcademicInterface) => ({
                        value: item.id,
                        label: item.year,
                      })
                    )}
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
      )}
    </>
  );
};

export default MagazineUpdate;
