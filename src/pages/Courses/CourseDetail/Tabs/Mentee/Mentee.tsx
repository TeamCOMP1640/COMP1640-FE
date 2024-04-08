import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { useGetCourseMembers } from "@app/hooks/useCourse";
import { MenteeInterface } from "@app/interfaces/Mentee";
import { Col, Input, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenteeColumnsTable } from "./MenteeColumn";

const Members = ({ role, courseId }: { role: string; courseId: string }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");

  const [params, setParams] = useState<{ role: string; search?: string }>({
    role: role,
  });

  const { data: members, isLoading } = useGetCourseMembers(courseId ?? "", {
    ...params,
    search: params.search ?? "",
  });

  const handleClear = () => {
    setParams((prevFilters) => ({
      ...prevFilters,
      search: "",
    }));
  };

  const handleSearch = () => {
    setParams((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  };

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
                setSearchValue(e.target.value);
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

      <Table<MenteeInterface>
        columns={MenteeColumnsTable(role)}
        dataSource={members ?? []}
        pagination={false}
        loading={isLoading}
        pageType="detail"
      />
    </div>
  );
};

export default Members;
