import {
  DeleteOutlined,
  EditOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import i18n from "@app/config/i18n";
import { AcademicInterface } from "@app/interfaces/Academic";
import { Space, Typography } from "antd";
import { FacultyInterface } from "@app/interfaces/Faculty";

export const FacultyColumnsTable = (
  handleAction: (key: string, item: FacultyInterface) => void,
  role: string
): ColumnsType<FacultyInterface> => {
  const columns: ColumnsType<FacultyInterface> = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
      render: (_text, record) => <Typography>{record.name}</Typography>,
    },
    {
      title: <Translation>{(t) => t("TABLE.ACTIONS")}</Translation>,
      dataIndex: "actions",
      key: "actions",
      fixed: "left",
      align: "right",
      width: 100,
      render: (_text, record) => (
        <Space>
          {role === "student" ? (
            <ButtonAction
              variant="primary"
              tooltip='Assign to faculty'
              handleAction={() => handleAction("assign", record)}
            >
              <CarryOutOutlined />
            </ButtonAction>
          ) : (
            <>
              <ButtonAction
                variant="primary"
                tooltip={i18n.t("ACTION.EDIT")}
                handleAction={() => handleAction("update", record)}
              >
                <EditOutlined />
              </ButtonAction>
              <ButtonAction
                variant="danger"
                handleAction={() => handleAction("deleted", record)}
                tooltip={i18n.t("ACTION.DELETE")}
              >
                <DeleteOutlined />
              </ButtonAction>
            </>
          )}
        </Space>
      ),
    },
  ];

  // Check if the role is not "student", then add the "Enrolment Key" column
  if (role !== "student") {
    columns.splice(1, 0, {
      title: "Enrolment Key",
      dataIndex: "enrolment_key",
      width: 150,
    });
  }

  return columns;
};
