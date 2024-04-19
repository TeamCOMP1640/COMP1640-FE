import {
  Button,
  Checkbox,
  CheckboxProps,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Rule } from "antd/es/form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { yupSync } from "@app/helpers/yupSync";
import { useGetFaculties } from "@app/hooks/useFaculty";
import { useCreateMagazine } from "@app/hooks/useMagazine";
import { FacultyInterface } from "@app/interfaces/Faculty";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useCreateArticle } from "@app/hooks/useArticle";
import { useParams } from "react-router-dom";
import { ID } from "@app/constant/auth";
import { getLocalStorage } from "@app/config/storage";
import { useState } from "react";
import { notificationError } from "@app/helpers/notification";

const ArticleComment = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [checkTerm, setCheckTerm] = useState(false);
  const validator = [
    yupSync(
      yup.object().shape({
        title: yup
          .string()
          .trim()
          .required(
            i18n.t("VALIDATE.REQUIRED", {
              field: "Title",
            })
          ),
      })
    ),
  ] as unknown as Rule[];

  const { mutate: handleCreateArticle, isPending } = useCreateArticle();
  const { data: dataFaculties, isLoading, refetch } = useGetFaculties();

  const handleSubmit = async (value: any) => {
    const formattedDate = dayjs(new Date()).format("YYYY-MM-DD");
    if (!checkTerm) {
      notificationError("Can't submit if not agree with term");
      return;
    }
    const { image } = value;

    const formData = new FormData();
    formData.append("file", image);
    await Promise.all([
      handleCreateArticle({
        ...value,
        submitted_date: formattedDate,
        magazine_id: id,
        status: "Not Publication",
        user_id: getLocalStorage(ID),
      }),
      setIsModalOpen(false),
      form.resetFields(),
    ]);
  };

  //   const initialValues = { faculty_id: [facultyName?.id] };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange: CheckboxProps["onChange"] = (e) => {
    setCheckTerm(e.target.checked);
  };

  return (
    <Modal
      title="Submit Article"
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
        // initialValues={initialValues}
      >
        <Row gutter={[8, 8]} className="px-15px py-1rem">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TextField label="Comment about article" name="comment">
              <TextArea
                showCount
                maxLength={1000}
                placeholder="Comment"
                style={{ height: 120, resize: "none", padding: "1px 5px" }}
              />
            </TextField>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ArticleComment;
