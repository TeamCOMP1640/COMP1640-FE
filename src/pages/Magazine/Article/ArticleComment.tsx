import { Col, Form, Row } from "antd";
import { useTranslation } from "react-i18next";

import { TextField } from "@app/components/atoms/TextField/TextField";
import { Modal } from "@app/components/molecules/Modal/Modal";
import { getLocalStorage } from "@app/config/storage";
import { ID } from "@app/constant/auth";
import {
  useCheckExistComment,
  useCreateComment,
  useGetComment,
  useUpdateComment,
} from "@app/hooks/useComment";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ArticleComment = ({
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
  const { id } = useParams();

  const { data: isExist } = useCheckExistComment(
    articleId,
    getLocalStorage(ID) || ""
  );

  const { data: dataComment } = useGetComment(
    articleId,
    getLocalStorage(ID) || ""
  );

  const initialValues = {
    detail: dataComment ? dataComment.detail : "",
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, dataComment]);

  const { mutate: handleCreateComment, isPending } = useCreateComment();
  const { mutate: handleUpdateComment, isPending: updatePending } =
    useUpdateComment(dataComment?.id);

  const handleSubmit = async (value: any) => {
    if (!dataComment) {
      await Promise.all([
        handleCreateComment({
          ...value,
          article_id: articleId,
          user_id: getLocalStorage(ID),
        }),
        setIsModalOpen(false),
        form.resetFields(),
      ]);
    } else {
      await Promise.all([
        handleUpdateComment({
          ...value,
          // article_id: articleId,
          // user_id: getLocalStorage(ID),
        }),
        setIsModalOpen(false),
        form.resetFields(),
      ]);
    }
  };

  return (
    <Modal
      title="Add a Comment"
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
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <TextField label="Comment about article" name="detail">
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
