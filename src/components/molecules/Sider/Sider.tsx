import {
  AppstoreOutlined,
  CalendarOutlined,
  FolderOutlined,
  GiftOutlined,
  RightOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Dropdown,
  MenuProps as DropdownProps,
  Image,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { enIcon, logo, viIcon } from "@app/assets/images";
import Icon from "@app/components/atoms/Icon/Icon";
import { getLocalStorage } from "@app/config/storage";
import { LOCALES, STORAGE_KEY } from "@app/constant";
import { AVATAR, USER_PROFILE } from "@app/constant/auth";
import { useLogout } from "@app/hooks/useAuth";
import "./Sider.scss";

// type MenuProps = {
//   key: string;
//   icon: ReactNode;
//   label: string;
// };

const Sider: FC = () => {
  const { Sider } = Layout;
  const { Item } = Menu;

  const [menuKey, setMenuKey] = useState<string>("");

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlKey = location.pathname.split("/")[1];
    setMenuKey(urlKey);
  }, [location]);

  const { mutate: handleLogout } = useLogout();

  const menuItems: DropdownProps["items"] = [
    {
      key: "",
      icon: <Icon icon={AppstoreOutlined} />,
      label: t("SIDER.DASHBOARD"),
    },
    {
      key: "courses",
      icon: <Icon icon={FolderOutlined} />,
      label: t("SIDER.COURSES"),
    },
    {
      key: "gifts",
      icon: <Icon icon={GiftOutlined} />,
      label: t("SIDER.GIFTS"),
    },
    {
      key: "accounts",
      icon: <Icon icon={TeamOutlined} />,
      label: t("SIDER.ACCOUNTS"),
    },
    {
      key: "workshops",
      icon: <Icon icon={CalendarOutlined} />,
      label: t("SIDER.WORKSHOPS"),
    },
  ];

  const handleChangeLanguage = async (value: string) => {
    localStorage.setItem(STORAGE_KEY.LOCALES, value);
    await i18n.changeLanguage(value);
  };

  const items: DropdownProps["items"] = [
    {
      title: "",
      key: "1",
      label: (
        <Typography className="font-semibold text-base">
          {getLocalStorage(USER_PROFILE)}
        </Typography>
      ),
    },
    {
      title: "",
      key: "2",
      label: (
        <Row gutter={16}>
          <Col>
            <Typography className="font-sm text-normal">
              {t("SIDER.LANGUAGES")}
            </Typography>
          </Col>
          <Col>
            <RightOutlined />
          </Col>
        </Row>
      ),
      children: [
        {
          title: "",
          key: "vi",
          label: (
            <Row
              gutter={16}
              onClick={() => handleChangeLanguage(LOCALES.VI)}
              className={`${
                localStorage.getItem(STORAGE_KEY.LOCALES) === LOCALES.VI
                  ? "bg-[#F3F3F3]"
                  : ""
              }`}
            >
              <Col>
                <Image preview={false} src={viIcon} width={20} />
              </Col>
              <Col>
                <Typography className="font-sm text-normal">
                  {t("LANGUAGES.VI")}
                </Typography>
              </Col>
            </Row>
          ),
        },
        {
          title: "",
          key: "en",
          label: (
            <Row
              gutter={16}
              onClick={() => handleChangeLanguage(LOCALES.EN)}
              className={`${
                localStorage.getItem(STORAGE_KEY.LOCALES) === LOCALES.EN
                  ? "bg-[#F3F3F3]"
                  : ""
              }`}
            >
              <Col>
                <Image preview={false} src={enIcon} width={20} />
              </Col>
              <Col>
                <Typography className="font-sm text-normal">
                  {t("LANGUAGES.EN")}
                </Typography>
              </Col>
            </Row>
          ),
        },
      ],
    },
    {
      title: "",
      key: "3",
      label: (
        <Typography
          className="font-sm text-normal"
          onClick={() => navigate("/profile")}
        >
          {t("SIDER.PROFILE")}
        </Typography>
      ),
    },
    {
      title: "",
      key: "4",
      label: (
        <Typography
          className="font-sm text-normal"
          onClick={() => handleLogout()}
        >
          {t("SIDER.LOGOUT")}
        </Typography>
      ),
    },
  ];

  return (
    <Sider className="ant-layout-sider w-60 shadow-none" collapsed={true}>
      <Row className="flex flex-col h-screen">
        <Col className="flex-none">
          <Space>
            {/* <Image
              onClick={() => navigate("/")}
              preview={false}
              src={logo}
              width={40}
              className="mt-1rem cursor-pointer"
            /> */}
          </Space>
        </Col>

        <Col className="flex-grow">
          <Menu
            selectedKeys={[menuKey]}
            onClick={({ key }) => {
              navigate(key);
            }}
            className="ant-menu mt-6"
            items={menuItems}
          >
            {menuItems.map((item: any, index: number) => (
              <Item key={index} icon={item.icon} className="ant-menu-item">
                {item.label}
              </Item>
            ))}
          </Menu>
        </Col>
        <Col className="flex justify-center mb-2rem">
          <Dropdown menu={{ items }} placement="topRight" arrow>
            <Avatar
              size={50}
              src={getLocalStorage(AVATAR)}
              className="mb-0.5 cursor-pointer"
            />
          </Dropdown>
        </Col>
      </Row>
    </Sider>
  );
};

export default Sider;
