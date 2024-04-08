import { DATE_FORMAT } from "@app/constant/date-time";
import { useGetWsDashboard } from "@app/hooks/useWorkshop";
import { Calendar as CalendarAntd, Typography } from "antd";
import { CalendarProps } from "antd/lib";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./Calendar.scss";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import en_US from "antd/lib/date-picker/locale/en_US";
import vi_VN from "antd/lib/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import "dayjs/locale/en";
import { LOCALES, STORAGE_KEY } from "@app/constant";

dayjs.extend(utc);
dayjs.extend(timezone);

const Calendar = () => {
  const [render, setRerender] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format(DATE_FORMAT)
  );

  const { data } = useGetWsDashboard(selectedDate);

  const getListData = (value: string) => {
    const dataForDate = data?.filter((item) =>
      (dayjs(item?.date).format(DATE_FORMAT) as unknown as string).startsWith(
        value
      )
    );

    return dataForDate?.map((item) => ({
      id: item.id,
      type: item.title,
    }));
  };

  const caseValue = data?.map((item) => dayjs(item.date).format(DATE_FORMAT));

  const onPanelChange = (value: Dayjs, mode?: CalendarProps<Dayjs>["mode"]) => {
    const formatDate = value.format(DATE_FORMAT);
    setRerender(!render);
    setSelectedDate(formatDate);
  };

  useEffect(() => {
    setRerender(!render);
  }, [selectedDate]);

  useEffect(() => {
    const dateValues = document.querySelectorAll(
      ".ant-picker-calendar-date-value"
    );
    const tooltips = document.querySelectorAll(
      ".ant-picker-calendar-date-content"
    );

    if (data) {
      dateValues.forEach((dateValue, index) => {
        const tooltipContent = tooltips[index];
        if (!tooltipContent) return;
        const content = dateValue.nextElementSibling as HTMLElement;
        if (!content) return;

        const textContent = tooltipContent?.textContent?.trim();

        if (!caseValue?.includes(selectedDate)) {
          dateValue.classList.remove("active");
        }

        if (textContent) {
          dateValue.classList.add("active");
          content.style.display = "";
        } else {
          dateValue.classList.remove("active");
          content.style.display = "none";
        }

        dateValue.addEventListener("mouseenter", () => {
          const tooltipContent = tooltips[index];
          if (!tooltipContent) return;

          const content = dateValue.nextElementSibling as HTMLElement;
          if (!content) return;

          const tooltipRect = content.getBoundingClientRect();
          const offset = 10;
          const textContent = tooltipContent?.textContent?.trim();

          if (textContent) {
            if (tooltipRect.right > window.innerWidth - offset) {
              content.classList.add("right-edge");
            }
            dateValue.classList.add("active");
            content.style.display = "";
          } else {
            dateValue.classList.remove("active");
            content.style.display = "none";
          }
        });
      });
    }
  }, [render, selectedDate, data]);

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value.format(DATE_FORMAT));
    return (
      <>
        {listData?.map((item) => (
          <p key={item.id}>
            {item.type.length > 20
              ? `${item.type.substring(0, 20)}...`
              : item.type}
          </p>
        ))}
      </>
    );
  };

  return (
    <CalendarAntd
      fullscreen={false}
      onPanelChange={onPanelChange}
      cellRender={dateCellRender}
      mode="month"
      className="h-full"
      locale={
        localStorage.getItem(STORAGE_KEY.LOCALES) === LOCALES.VI ? vi_VN : en_US
      }
      // disabledDate={disabledDate}
    />
  );
};

export default Calendar;
