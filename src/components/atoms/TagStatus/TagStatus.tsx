import { StatusCourseEnum } from "@app/constant";
import { Tag as TagAntd } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface TagProps {
  status: string;
  translate?: boolean;
}

export const TagStatus: FC<TagProps> = ({ status, translate = true }) => {
  const { t } = useTranslation();

  let backgroundColor = "#D8DAE0";
  let color = "#6A6A82";

  switch (status) {
    case StatusCourseEnum.IN_PROGRESS: {
      backgroundColor = "#f7f28f";
      color = "#a6a242";
      break;
    }
    case StatusCourseEnum.COMPLETED: {
      backgroundColor = "#D5F2E9";
      color = "#00C07D";
      break;
    }
    case StatusCourseEnum.NOT_STARTED: {
      backgroundColor = "#D7DADF";
      color = "#6A6A82";
      break;
    }
    case "default": {
      break;
    }
  }

  return (
    <TagAntd
      className="rounded-3xl px-15px py-4px"
      color={backgroundColor}
      style={{ color: `${color}`, marginTop: "2px" }}
    >
      {translate
        ? t(`STATUS.${status?.toUpperCase().replace(/ /g, "_")}`)
        : status}
    </TagAntd>
  );
};
