import i18n from "@app/config/i18n";
import { Modal, Row, Typography } from "antd";
import "./openModal.scss";
import { ModalTypeEnum } from "@app/constant";

let isModalVisible = false;
export const openModal = (
  haddleOkeAction: () => void,
  type: ModalTypeEnum,
  url: string,
  content: string,
  title: string,
  textBtn?: string,
  childrenContent?: string
) => {
  if (isModalVisible) {
    return;
  }

  isModalVisible = true;
  Modal[type]({
    icon: (
      <Row
        justify="center"
        style={{ marginBottom: "1rem", display: "ruby-text" }}
      >
        <img src={`${url}`} alt="#" />
      </Row>
    ),
    title: (
      <Row justify="center" style={{ fontWeight: 800, fontSize: 17 }}>
        {title}
      </Row>
    ),
    className: "modal-open",
    content: (
      <>
        <Row justify="center" style={{ fontWeight: 500 }}>
          {content}
        </Row>
        <Row style={{ fontWeight: 600 }} justify="center">
          {childrenContent}
        </Row>
      </>
    ),
    cancelText: (
      <Typography style={{ fontWeight: 500 }}>
        {i18n.t("BUTTON.CANCEL")}
      </Typography>
    ),
    okText: textBtn ?? (
      <Typography style={{ fontWeight: 500, color: "#FFFFFF" }}>
        {i18n.t("BUTTON.COMFIRM")}
      </Typography>
    ),
    onOk() {
      haddleOkeAction();
      const modalDisplayDelay = 3000;
      setTimeout(() => {
        isModalVisible = false;
      }, modalDisplayDelay);
    },
    onCancel() {
      isModalVisible = false;
    },
  });
};
