import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { ListPage } from "@app/components/atoms/ListPage/ListPage";
import { Table } from "@app/components/atoms/Table/Table";
import { TextField } from "@app/components/atoms/TextField/TextField";
import { openModal } from "@app/components/molecules/ModalConfirm/OpenModal";
import { ModalTypeEnum } from "@app/constant";
import { ICON_URL } from "@app/constant/url-image";
import {
  useDeleteAccount,
  useGetAccount,
  useGetAccounts,
} from "@app/hooks/useAccount";
import { BREADCRUMBS_ENUM, IBreadcrumbItem } from "@app/interfaces";
import { AccountsInterface } from "@app/interfaces/Account";
import { GetListParams } from "@app/interfaces/common";
import { Col, Input, Row, Space } from "antd";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AccountCreate from "../AccountCreate/AccountCreate";
import AccountUpdate from "../AccountUpdate/AccountUpdate";
import { AccountColumnsTable } from "./AccountListColumn";

const AccountList = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [id, setId] = useState<string>("");

  const navigate = useNavigate();

  const [table, setTable] = useState({
    page: 1,
    take: 100,
  });
  const [filters, setFilters] = useState({
    name: "",
    courseId: "",
  });

  const paginateOptions: GetListParams = {
    name: filters.name,
    courseId: filters.courseId,
    pageNumber: table.page,
    pageSize: table.take,
  };

  const { data, isLoading, refetch } = useGetAccounts(paginateOptions);
  const { mutate: onDeleteAccount } = useDeleteAccount();
  const { data: dataDetail } = useGetAccount(id);

  const handleTableChange = (pagination: any) => {
    setTable({
      page: pagination.current || 1,
      take: pagination.pageSize || 100,
    });
  };

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClear = async (field: "name" | "courseId") => {
    if (field === "name") {
      await Promise.all([
        setTable({
          page: 1,
          take: table.take,
        }),
        setFilters((prevFilters) => ({
          ...prevFilters,
          name: "",
        })),
      ]);
    } else if (field === "courseId") {
      await Promise.all([
        setTable({
          page: 1,
          take: table.take,
        }),
        setFilters((prevFilters) => ({
          ...prevFilters,
          courseId: "",
        })),
      ]);
    }
    refetch();
  };

  const handleAction = (action: string, record: AccountsInterface) => {
    switch (action) {
      case "detail":
        navigate(`/accounts/${record.id}`);
        break;
      case "deleted":
        openModal(
          () => {
            onDeleteAccount({ id: record.id });
          },
          ModalTypeEnum.CONFIRM,
          ICON_URL.ICON_TRASH,
          t("MODAL.CONFIRM_DELETE", { name: record.username }),
          t("MODAL.TITLE_DELETE", { name: record.username })
        );
        break;
      case "update":
        Promise.all([setIsModalDetailOpen(true), setId(record.id)]);
        break;
    }
  };

  const breadcrumbItems: IBreadcrumbItem[] = [
    { key: BREADCRUMBS_ENUM.ACCOUNTS },
  ];

  const handleSearch = async () => {
    await Promise.all([
      setTable({
        page: 1,
        take: table.take,
      }),
      refetch(),
    ]);
  };

  return (
    <ListPage
      page={breadcrumbItems}
      title={t("BREADCRUMBS.ACCOUNTS")}
      extra={
        <Space>
          <Button type="primary" onClick={() => showModal()}>
            <PlusOutlined />
            Add new account
          </Button>
        </Space>
      }
    >
      <Row gutter={[8, 4]} className="px-15px py-1rem">
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
                  handleClear("name");
                }
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  name: e.target.value,
                }));
              }}
            />
          </TextField>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
          <Row justify="space-between">
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => handleSearch()}
            >
              <SearchOutlined />
              {t("BUTTON.SEARCH")}
            </Button>
          </Row>
        </Col>
      </Row>
      <Table<AccountsInterface>
        columns={AccountColumnsTable(handleAction)}
        loading={isLoading}
        onChange={handleTableChange}
        paginate={{
          table,
          setTable,
          total: 1,
          pageCount: 1,
          // nameItemCount: "TOTAL_WORKSHOP",
        }}
        dataSource={data?.data || []}
        overflow={true}
      />
      <AccountCreate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {id && (
        <AccountUpdate
          isModalOpen={isModalDetailOpen}
          setIsModalOpen={setIsModalDetailOpen}
          dataDetail={dataDetail}
        />
      )}
    </ListPage>
  );
};

export default AccountList;
