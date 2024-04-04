import { Modal as AntModal, ModalProps, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "./Modal.scss";

interface Props extends ModalProps {
  title?: string;
  hidenButtonOk?: boolean;
}

export const Modal: React.FC<Props> = ({
  children,
  open,
  title,
  footer,
  className,
  hidenButtonOk = false,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <AntModal
      title={
        <Space className="pl-rem pb-1rem">
          <Typography.Text className="font-bold text-18pix">
            {title}
          </Typography.Text>
        </Space>
      }
      className={`modal ${className}`}
      centered={true}
      okText={t("BUTTON.SAVE")}
      cancelText={t("BUTTON.CANCEL")}
      okButtonProps={
        hidenButtonOk
          ? { style: { display: "none" } }
          : { className: "button", type: "primary" }
      }
      cancelButtonProps={{ className: "button" }}
      open={open}
      {...props}
    >
      {children}
    </AntModal>
  );
};
