import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  Divider,
  Empty,
  Pagination,
  Row,
  Select,
  Space,
  Table as TableAnt,
  Typography,
} from "antd";
import { TableProps as TablePropsAntd } from "antd/lib/table";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "./Table.scss";

export interface PaginateProp {
  page: number;
  take: number;
}

interface HasId {
  id?: any;
  externalId?: any;
  devEui?: string;
  deveui?: string;
}

interface PaginateOptions {
  table: PaginateProp;
  setTable: (value: any) => void;
  total: number;
  pageCount: number;
  nameItemCount?: string;
}

const pageSizeOptions = [{ value: 5 }, { value: 10 }, { value: 20 }];
const DEFAULT_BOTTOM_HEIGHT = 65;

type TableProps<T> = TablePropsAntd<T> & {
  paginate?: PaginateOptions;
  overflow?: boolean;
  pageType?: "list" | "detail";
  hasCustomHeight?: boolean;
};

export const Table = <T extends HasId>({
  paginate,
  dataSource,
  hasCustomHeight = false,
  pageType = "list",
  overflow = false,
  ...rest
}: TableProps<T>) => {
  const [topHeight, setTopHeight] = useState(0);
  const { t } = useTranslation();
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const { current } = tableRef;
    if (current) {
      const { top } = current.getBoundingClientRect();
      setTopHeight(top + DEFAULT_BOTTOM_HEIGHT);
    }
  }, [dataSource, topHeight]);

  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TableAnt
        {...rest}
        className={`shadow-md ${
          pageType === "list" ? "list-table" : "simple-table"
        }`}
        sticky={true}
        dataSource={dataSource}
        rowKey={(record) =>
          record.id || record.externalId || record.devEui || record.deveui
        }
        scroll={{
          y: `calc(100vh - ${pageType === "list" ? 33 : 70}%)`,
        }}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t("TABLE.EMPTY")}
            />
          ),
        }}
      />

      {paginate && (
        <Row
          justify="space-between"
          className="bg-gray-200 pt-2 px-10"
          style={{ padding: "0.5rem" }}
        >
          <Space>
            {paginate.nameItemCount && (
              <Typography>
                {t(`TABLE.${paginate.nameItemCount}`, {
                  total: paginate?.total ? paginate?.total : 0,
                })}
              </Typography>
            )}
            <Divider type="vertical" style={{ backgroundColor: "#000000" }} />
            <Typography>
              {t("TABLE.TOTAL_PAGE", {
                total: paginate?.pageCount ? paginate?.pageCount : 0,
              })}
            </Typography>
            <Divider type="vertical" style={{ backgroundColor: "#000000" }} />
            <Typography>
              {t("TABLE.DISPLAY")}
              <Select
                style={{ marginLeft: 5, marginRight: 5, width: 70 }}
                defaultValue={paginate.table.take}
                onChange={(value: number) => {
                  paginate.setTable({
                    ...paginate.table,
                    take: value,
                    page: 1,
                  });
                }}
                options={pageSizeOptions}
                getPopupContainer={(triggerNode: HTMLElement) =>
                  triggerNode.parentNode as HTMLElement
                }
              />
              {t("TABLE.ITEM")}
            </Typography>
          </Space>

          <Pagination
            showSizeChanger={false}
            current={paginate.table.page}
            total={paginate.total}
            pageSize={paginate.table.take}
            itemRender={(_, type: string, originalElement) => {
              switch (type) {
                case "prev":
                  return <ArrowLeftOutlined />;
                case "next":
                  return <ArrowRightOutlined />;
                default:
                  return originalElement;
              }
            }}
            onChange={(page: number) => {
              paginate.setTable({
                ...paginate.table,
                page: page,
              });
            }}
          />
        </Row>
      )}
    </>
  );
};
