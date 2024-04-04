import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb as BreadcrumbAnt, Image, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import { homeIcon } from "@app/assets/images";
import { IBreadcrumbItem } from "@app/interfaces";
import "./Breadcrumb.scss";

interface Props {
  items: IBreadcrumbItem[];
}

const { Item } = BreadcrumbAnt;

export const Breadcrumb = ({ items }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <BreadcrumbAnt
      separator={<RightOutlined className="text-13pix" />}
      className="relative  top-0 w-full py-1rem"
    >
      <Item className="breadcrumb-item" onClick={() => navigate("/")}>
        <Image
          preview={false}
          // src={homeIcon}
          width={18}
          className="cursor-pointer"
        />
      </Item>
      {items.map((item, index, items) => {
        if (index === items.length - 1) {
          return (
            <Item key={index} className="text-black ml-0.5rem">
              {t(`BREADCRUMBS.${item.key.toUpperCase()}`)}
            </Item>
          );
        }

        return (
          <Item
            key={index}
            className="cursor-pointer ml-4 text-[#535ce5cc]"
            onClick={() =>
              !item.route
                ? navigate(`/${item.key}`)
                : navigate(`/${item.route}`)
            }
          >
            {t(`BREADCRUMBS.${item.key.toUpperCase()}`)} {item?.name}
          </Item>
        );
      })}
    </BreadcrumbAnt>
  );
};
