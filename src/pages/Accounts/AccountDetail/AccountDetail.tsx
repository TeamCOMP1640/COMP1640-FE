import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Col, Form, InputNumber, Row, Space, Typography } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { TagStatus } from "@app/components/atoms/TagStatus/TagStatus";
import Card from "@app/components/molecules/Card/Card";
import { useAddScore, useGetAccount } from "@app/hooks";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";

const AccountDetail: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [addScore, setAddScore] = useState(false);
  const [form] = Form.useForm();

  const { data } = useGetAccount(id ?? "");

  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.ACCOUNTS },
    { key: BREADCRUMBS_ENUM.ACCOUNT_DETAIL, name: data?.name },
  ];
  const { mutate: handleAddScore } = useAddScore();

  const handleSubmit = async (value: any) => {
    handleAddScore({ ...value, accountId: id });
    form.resetFields();
    setAddScore(false);
  };

  return (
    <ListPage
      page={breadcrumbItems}
      title={t("BREADCRUMBS.ACCOUNT_DETAIL")}
      className="p-1rem"
    >
      {data && (
        <Card className="pt-2rem">
          <Row gutter={16} className="w-full p-2rem">
            <Col sm={8} md={6} lg={6} xl={4}>
              <Avatar size={170} src={data.avatar} />
            </Col>
            <Col sm={16} md={18} lg={18} xl={20} className="p-1rem">
              <Row gutter={32} className="pb-1rem">
                <Col sm={8} md={6} lg={6} xl={4}>
                  {t("ACCOUNT.NAME")}
                </Col>
                <Col sm={16} md={18} lg={18} xl={20}>
                  <Typography.Text className="font-semibold">
                    {data.name}
                  </Typography.Text>
                </Col>
              </Row>
              <Row gutter={32} className="pb-1rem">
                <Col sm={8} md={6} lg={6} xl={4}>
                  {t("ACCOUNT.EMAIL")}
                </Col>
                <Col sm={16} md={18} lg={18} xl={20}>
                  <Typography.Text className="font-semibold">
                    {data.email}
                  </Typography.Text>
                </Col>
              </Row>
              <Row gutter={32} className="pb-1rem">
                <Col sm={8} md={6} lg={6} xl={4}>
                  <Typography.Text>{t("ACCOUNT.COURSES")}</Typography.Text>
                </Col>
                <Col sm={16} md={18} lg={18} xl={20}>
                  {data?.courses && data.courses.length > 0 ? (
                    data.courses.map((item: any) => (
                      <TagStatus
                        key={item.id}
                        status={item.name}
                        translate={false}
                      />
                    ))
                  ) : (
                    <Typography.Text className="font-semibold text-red-400">
                      {t("COURSE.NO_INFO")}
                    </Typography.Text>
                  )}
                </Col>
              </Row>
              <Row gutter={32} className="pb-1rem">
                <Col sm={8} md={6} lg={6} xl={4}>
                  {t("ACCOUNT.SCORE")}
                </Col>
                <Col sm={16} md={18} lg={18} xl={20}>
                  <>
                    <Typography.Text className="font-semibold">
                      {data.score}
                    </Typography.Text>
                    {addScore ? (
                      <Space style={{ marginLeft: "1rem" }}>
                        <Form
                          className="px-6 pt-6"
                          onFinish={handleSubmit}
                          form={form}
                          id="form-applications"
                          labelAlign="left"
                          wrapperCol={{ span: 24 }}
                        >
                          <Form.Item
                            name="score"
                            rules={[
                              {
                                required: true,
                                message: t("VALIDATE.REQUIRED", {
                                  field: t("ACCOUNT.SCORE"),
                                }) as string,
                              },
                            ]}
                          >
                            <InputNumber
                              name="score"
                              min={1}
                              className="w-5/6"
                              placeholder={t("PLACEHOLDER.SCORE")}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              style={{ height: "32px" }}
                              onClick={() => {
                                setAddScore(false), form.resetFields();
                              }}
                            >
                              {t("BUTTON.CANCEL")}
                            </Button>
                            <Button
                              style={{ height: "32px", marginLeft: "0.5rem" }}
                              type="primary"
                              htmlType="submit"
                            >
                              {t("BUTTON.SAVE")}
                            </Button>
                          </Form.Item>
                        </Form>
                      </Space>
                    ) : (
                      <Button
                        style={{ height: "32px", marginLeft: "1rem" }}
                        onClick={() => setAddScore(true)}
                      >
                        <PlusOutlined />
                        {t("BUTTON.ADD_SCORE")}
                      </Button>
                    )}
                  </>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}
    </ListPage>
  );
};

export default AccountDetail;
