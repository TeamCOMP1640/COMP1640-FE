import { getImageRank, getRank } from "@app/helpers/utils";
import { useLeaderBoard } from "@app/hooks/useDashboard";
import { ILeaderBoard } from "@app/interfaces/dashboard.interface";
import { Avatar, Empty, List, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TabLeaderBoard = ({
  filters,
  isShowAll = false,
}: {
  filters: { role: string; courseId: string };
  isShowAll?: boolean;
}) => {
  const { t } = useTranslation();

  const [topAccounts, setTopAccount] = useState<ILeaderBoard[]>();
  const { data: leaderBoard, isLoading } = useLeaderBoard(filters);

  useEffect(() => {
    if (leaderBoard) {
      setTopAccount(isShowAll ? leaderBoard : leaderBoard.slice(0, 3));
    }
  }, [leaderBoard, filters, isShowAll]);

  return (
    <List
      dataSource={topAccounts}
      loading={isLoading}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("TABLE.EMPTY")}
          />
        ),
      }}
      renderItem={(item, index) => {
        const updatedData = getRank([...(topAccounts || [])], index);
        const rankImage = getImageRank(updatedData[index].rank);

        return (
          <List.Item className="mr-0.5rem">
            {typeof rankImage === "string" ? (
              <div>
                <img src={rankImage} alt="img" className="pr-1rem" />
              </div>
            ) : (
              <div className="pr-1rem">
                <Avatar className="bg-transparent">
                  <span className="text-18pix font-extrabold text-text-color-2">
                    {rankImage}
                  </span>
                </Avatar>
              </div>
            )}
            <List.Item.Meta
              className="flex items-center"
              avatar={<Avatar src={item.avatar} size="large" />}
              title={item.name}
            />
            <Typography.Text className="font-extrabold text-text-color">
              {item.score}
              <span className="text-text-color-2 font-medium pl-1rem">
                {t("DASHBOARD.POINTS")}
              </span>
            </Typography.Text>
          </List.Item>
        );
      }}
    />
  );
};

export default TabLeaderBoard;
