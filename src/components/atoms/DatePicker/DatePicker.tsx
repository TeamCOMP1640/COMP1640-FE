import { LOCALES, STORAGE_KEY } from "@app/constant";
import { ConfigProvider, DatePicker as DatePickerAntd } from "antd";
import en_US from "antd/lib/locale/en_US";
import vi_VN from "antd/lib/locale/vi_VN";
import "dayjs/locale/vi";

const DatePicker = (props: any) => {
  return (
    <ConfigProvider
      locale={
        localStorage.getItem(STORAGE_KEY.LOCALES) === LOCALES.VI ? vi_VN : en_US
      }
    >
      <DatePickerAntd {...props} />
    </ConfigProvider>
  );
};

export default DatePicker;
