import { Col, Form, Input, Row, Select } from "antd";
import { Rule } from "antd/es/form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { yupSync } from "@app/helpers/yupSync";
import { useGetAccounts } from "@app/hooks";
import { useUpdateFalculty } from "@app/hooks/useFaculty";
import { AccountsInterface } from "@app/interfaces/Account";
import { FacultyInterface } from "@app/interfaces/Faculty";
import { GetListParams } from "@app/interfaces/common";
import { useEffect, useState } from "react";

const FacultyUpdate = ({
  isModalOpen,
  setIsModalOpen,
  dataDetail,
  dataDetailGuest,
  id,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  dataDetail?: FacultyInterface;
  dataDetailGuest?: FacultyInterface;
  id: string;
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

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });
  const [filters, setFilters] = useState({
    name: "",
    courseId: "",
  });

  const paginateOptions: GetListParams = {
    name: filters.name,
    courseId: filters.courseId,
    pageNumber: table.page,
    pageSize: table.take,
  };

  const {
    data: dataAccounts,
    isLoading,
    refetch,
  } = useGetAccounts({
    ...paginateOptions,
    role: "marketing_coordinator",
    facultyId: Number(id),
  });

  const { data: dataGuests } = useGetAccounts({
    ...paginateOptions,
    role: "guest",
    facultyId: Number(id),
  });

  const initialValues = dataDetail
    ? {
        name: dataDetail.name,
        enrolment_key: dataDetail.enrolment_key,
        users: dataDetail?.users?.map((user) => user.id) ?? [],
        guests: dataDetailGuest?.users?.map((user) => user.id) ?? [],
      }
    : {};

  const { mutate: handleUpdateFaculty, isPending } = useUpdateFalculty(
    dataDetail?.id ?? ""
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, dataDetail]);

  const handleSubmit = async (value: any) => {
    await Promise.all([
      handleUpdateFaculty({ ...value }),
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
          title="Update Faculty"
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
                  label="Enrolment Key"
                  name="enrolment_key"
                  required
                  rules={validator}
                >
                  <Input placeholder="Enrolment Key" allowClear />
                </TextField>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <TextField label="Marketing Coordinator" name="users">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Marketing Coordinator"
                    filterOption={filterOption}
                    options={
                      dataAccounts
                        ? dataAccounts?.data?.map(
                            (item: AccountsInterface) => ({
                              value: item.id,
                              label: item.fullname,
                            })
                          )
                        : []
                    }
                  />
                </TextField>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <TextField label="Guest" name="guests">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Guest"
                    filterOption={filterOption}
                    options={
                      dataGuests
                        ? dataGuests?.data?.map((item: AccountsInterface) => ({
                            value: item.id,
                            label: item.fullname,
                          }))
                        : []
                    }
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

export default FacultyUpdate;
