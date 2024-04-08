import { FC } from "react";
import { Avatar, Col, Divider, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { Modal } from "@app/components/molecules/Modal/Modal";
import { TeamInterface } from "@app/interfaces";
import { Button } from "@app/components/atoms/Button/Button";

type Props = {
  setOpen: (value: boolean) => void;
  isOpen: boolean;
  team: TeamInterface;
};

const TeamDetail: FC<Props> = ({ setOpen, isOpen, team }) => {
  const { t } = useTranslation();
  return (
    <>
      {team && (
        <Modal
          open={isOpen}
          title={team.name}
          onCancel={() => setOpen(false)}
          className="px-2rem"
          hidenButtonOk={true}
        >
          <Divider className="mt-[-10px]" />
          <Row>
            <Typography.Text className="text-lg font-bold">
              {t("TEAM.MENTOR")}
            </Typography.Text>
          </Row>
          <Row>
            <Col span={24} className="w-full justify-start">
              {team?.mentors.map((mentor, index) => {
                return (
                  <Row className="py-1rem">
                    <Col sm={6} md={6} lg={4} xl={4} xxl={3}>
                      <Avatar size={40} key={index} src={mentor.avatar} />
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={16}
                      xl={16}
                      xxl={18}
                      className="content-center mt-10px"
                    >
                      <Typography.Text className="font-medium font-[13px]">
                        {mentor.name}
                      </Typography.Text>
                    </Col>
                    <Col sm={6} md={6} lg={4} xl={4} xxl={3}>
                      <Typography.Text className="text-base	font-bold">
                        {mentor.grade}
                      </Typography.Text>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Typography.Text className="text-lg font-bold">
              {t("TEAM.MENTEE")}
            </Typography.Text>
          </Row>
          <Row>
            <Col span={24} className="w-full justify-start">
              {team?.mentees.map((mentee, index) => {
                return (
                  <Row className="py-1rem">
                    <Col sm={6} md={6} lg={4} xl={4} xxl={3}>
                      <Avatar size={40} key={index} src={mentee.avatar} />
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={16}
                      xl={16}
                      xxl={18}
                      className="content-center mt-10px"
                    >
                      <Typography.Text className="font-medium font-[13px]">
                        {mentee.name}
                      </Typography.Text>
                    </Col>
                    <Col sm={6} md={6} lg={4} xl={4} xxl={3}>
                      <Typography.Text className="text-base	font-bold">
                        {mentee.grade}
                      </Typography.Text>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default TeamDetail;
