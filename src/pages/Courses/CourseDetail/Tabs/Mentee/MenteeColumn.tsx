import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { MenteeInterface } from "@app/interfaces/Mentee";
import GroupAvatarItem from "@app/components/atoms/GroupAvatar/GroupAvatar";

export const MenteeColumnsTable = (
  role: string
): ColumnsType<MenteeInterface> => {
  const columns: ColumnsType<MenteeInterface> = [
    {
      title: <Translation>{(t) => t("MENTEE.AVATAR")}</Translation>,
      dataIndex: "avatar",
      width: 100,
      render: (avatar: string, record) => (
        <GroupAvatarItem src={avatar} name={record.name} />
      ),
    },
    {
      title: <Translation>{(t) => t("MENTEE.NAME")}</Translation>,
      dataIndex: "name",
      width: 100,
    },
    {
      title: <Translation>{(t) => t("MENTEE.EMAIL")}</Translation>,
      dataIndex: "email",
      width: 100,
    },
  ];

  if (role === "MENTEE") {
    columns.push({
      title: <Translation>{(t) => t("MENTEE.LESSON")}</Translation>,
      dataIndex: "lesson",
      width: 50,
      align: "right",
      render: (text, record) => {
        return `${record.lessonStatistic}`;
      },
    });
  }

  return columns;
};
