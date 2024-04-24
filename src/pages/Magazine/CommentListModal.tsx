import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { Rule } from "antd/es/form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import i18n from "@app/config/i18n";
import { DATE_FORMAT } from "@app/constant/date-time";
import { yupSync } from "@app/helpers/yupSync";
import { useGetAcademics } from "@app/hooks";
import { useCreateMagazine } from "@app/hooks/useMagazine";
import { FacultyInterface } from "@app/interfaces/Faculty";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { AcademicInterface } from "@app/interfaces/Academic";
import { useGetComments } from "@app/hooks/useComment";
import { useEffect } from "react";

const CommentListModal = ({
  isModalOpen,
  setIsModalOpen,
  articleId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  articleId: string;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data } = useGetComments(articleId);

  const initialValues = {
    description: data?.data[0]?.detail,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, data]);
  return (
    <Modal
      title="Comment about article"
      open={isModalOpen}
      hidenButtonOk={true}
      onCancel={() => {
        setIsModalOpen(false), form.resetFields();
      }}
      width={1000}
    >
      <Form
        className="px-6 pt-6"
        form={form}
        id="form-applications"
        labelAlign="left"
        wrapperCol={{ span: 24 }}
        initialValues={initialValues}
      >
        <Row gutter={[8, 8]} className="px-15px py-1rem">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row>
              <Typography>Coordinator Name: </Typography>
              <Typography.Text style={{ fontWeight: "bold", marginLeft: 20 }}>
                {data?.data[0]?.user?.fullname}
              </Typography.Text>
            </Row>
            <Divider />
            <TextField label="Comment" name="description">
              <TextArea
                showCount
                maxLength={1000}
                // placeholder={t("PLACEHOLDER.DESCRIPTION")}
                disabled
                style={{ height: 120, resize: "none", padding: "1px 5px" }}
              />
            </TextField>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CommentListModal;
