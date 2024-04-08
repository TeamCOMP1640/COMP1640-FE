import { SearchOutlined } from "@ant-design/icons";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { useGetTeams } from "@app/hooks";
import {
  MenteeInTeam,
  MentorInTeam,
  TeamInterface,
  TeamResponse,
} from "@app/interfaces";
import { Col, Input, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { TeamColumn } from "./TeamColumn";
import { Button } from "@app/components/atoms/Button/Button";
import { Table } from "@app/components/atoms/Table/Table";
import TeamDetail from "../TeamDetail/TeamDetail";
import "./TeamList.scss";

type Props = {};

const TeamList: FC<Props> = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [params, setParams] = useState<{ search?: string }>({
    search: "",
  });
  const [tableData, setTableData] = useState<TeamInterface[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<TeamInterface | null>(null);

  const {
    data: teams,
    isLoading,
    refetch,
  } = useGetTeams(id ?? "", {
    ...params,
    search: params.search ?? "",
  });

  const handleClear = async () => {
    await Promise.all([
      setParams((prevFilters) => ({
        ...prevFilters,
        search: "",
      })),
    ]);
    refetch();
  };

  const handleSearch = () => {
    refetch();
  };

  const handleAction = (type: String, record: TeamInterface) => {
    switch (type) {
      case "detail":
        setTeamData(record);
        setOpenModal(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (teams) {
      let teamData: TeamInterface[] = [];
      teams?.map((item: TeamResponse) => {
        const mentorArr: MentorInTeam[] = item?.capabilities
          ?.filter((item) => item.role === "MENTOR")
          .map((item) => {
            return {
              id: item.account_id,
              avatar: item.avatar,
              name: item.name,
              grade: item.grade,
            };
          });
        const menteeArr: MenteeInTeam[] = item?.capabilities
          ?.filter((item) => item.role === "MENTEE")
          .map((item) => {
            return {
              id: item.account_id,
              avatar: item.avatar,
              name: item.name,
              grade: item.grade,
            };
          });

        const newData = {
          id: item.id,
          name: item.name,
          mentees: menteeArr,
          mentors: mentorArr,
        };

        teamData.push(newData);
      });
      setTableData(teamData);
    }
  }, [teams]);

  return (
    <div>
      <Row gutter={[8, 8]} className="m-1rem">
        <Col xs={24} sm={24} md={4}>
          <TextField
            label={t("INPUT.NAME")}
            normalize={(value) => value.trim()}
            name="name"
          >
            <Input
              placeholder={t("PLACEHOLDER.NAME")}
              allowClear
              onChange={(e) => {
                if (e.type === "click") {
                  handleClear();
                }
                setParams((prevFilters) => ({
                  ...prevFilters,
                  search: e.target.value,
                }));
              }}
            />
          </TextField>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
          <Row justify="space-between">
            <Button type="primary" onClick={() => handleSearch()}>
              <SearchOutlined />
              {t("BUTTON.SEARCH")}
            </Button>
          </Row>
        </Col>
      </Row>

      <Table<TeamInterface>
        columns={TeamColumn(handleAction)}
        dataSource={tableData && tableData}
        pagination={false}
        loading={isLoading}
        pageType="detail"
      />

      {openModal && teamData !== null && (
        <TeamDetail isOpen={openModal} setOpen={setOpenModal} team={teamData} />
      )}
    </div>
  );
};

export default TeamList;
