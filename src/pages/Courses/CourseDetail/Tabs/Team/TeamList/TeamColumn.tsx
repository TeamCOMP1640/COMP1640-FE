import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@app/components/atoms/ButtonAction/ButtonAction";
import { MenteeInTeam, MentorInTeam, TeamInterface } from "@app/interfaces";
import { Avatar, Tooltip } from "antd";
import i18n from "@app/config/i18n";
import GroupAvatarItem from "@app/components/atoms/GroupAvatar/GroupAvatar";

export const TeamColumn = (
  handleAction: (key: string, record: TeamInterface) => void
): ColumnsType<TeamInterface> => [
  {
    title: <Translation>{(t) => t("TEAM.MENTORS")}</Translation>,
    dataIndex: "mentors",
    width: "25%",
    render: (record: MentorInTeam[]) => (
      <Avatar.Group maxCount={3} maxPopoverTrigger="hover" size="large">
        {record.map((mentor, index) => {
          return (
            <GroupAvatarItem
              key={index}
              src={mentor.avatar}
              name={mentor.name}
            />
          );
        })}
      </Avatar.Group>
    ),
  },

  {
    width: "25%",
    title: <Translation>{(t) => t("TEAM.NAME")}</Translation>,
    dataIndex: "name",
  },
  {
    title: <Translation>{(t) => t("TEAM.MENTEES")}</Translation>,
    dataIndex: "mentees",
    width: "25%",
    render: (record: MenteeInTeam[]) => (
      <Avatar.Group maxCount={3} maxPopoverTrigger="hover" size="large">
        {record.map((mentee, index) => {
          return (
            <GroupAvatarItem
              key={index}
              src={mentee.avatar}
              name={mentee.name}
            />
          );
        })}
      </Avatar.Group>
    ),
  },
  {
    title: <Translation>{(t) => t("TABLE.ACTIONS")}</Translation>,
    dataIndex: "actions",
    key: "actions",
    fixed: "left",
    width: "25%",
    render: (_text, record) => (
      <>
        <ButtonAction
          variant="success"
          handleAction={() => handleAction("detail", record)}
          tooltip={i18n.t("ACTION.DETAILS")}
        >
          <SearchOutlined />
        </ButtonAction>
      </>
    ),
  },
];
