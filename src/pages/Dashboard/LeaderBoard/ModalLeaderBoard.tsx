import { Button } from "@app/components/atoms/Button/Button";
import { Modal } from "@app/components/molecules/Modal/Modal";
import { Col, Row } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import TabLeaderBoard from "./TabLeaderBoard";

type Props = {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  filters: { role: string; courseId: string };
  title: string;
};

const ModalLeaderBoard: FC<Props> = ({ setIsOpen, isOpen, filters, title }) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={isOpen}
      title={`${t("DASHBOARD.LEADERBOARD")} - ${t(`COURSE.${title}`)}`}
      footer={
        <Button type="primary" onClick={() => setIsOpen(!isOpen)}>
          {t("BUTTON.CANCEL")}
        </Button>
      }
      hidenButtonOk={true}
      onCancel={() => setIsOpen(!isOpen)}
      className="dashboard-modal"
    >
      <Row>
        <Col span={24}>
          <TabLeaderBoard filters={filters} isShowAll={true} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalLeaderBoard;
