import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "@app/components/atoms/Button/Button";
import { useGetCourse, useUploadTimeline } from "@app/hooks/useCourse";
import { Col, Empty, Image, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Timeline = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data } = useGetCourse(id ?? "");
  const { mutate: handleUploadTimeline, isPending } = useUploadTimeline();

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      handleUploadTimeline({
        id: id ?? "",
        file: formData,
      });
    }
  };

  return (
    <>
      <Row justify="end" className="w-full pb-1rem">
        <Col>
          <Input
            type="file"
            id="fileInput"
            accept=".jpg, .jpeg, .png, .gif"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button type="primary" onClick={handleUploadClick}>
            <UploadOutlined />
            {t("BUTTON.UPLOAD")}
            {isPending ? <LoadingOutlined className="ml-1" /> : null}
          </Button>
        </Col>
      </Row>
      <Row justify="center" align="middle" className="w-full">
        {data?.course.image_url ? (
          <div className="w-full max-h-[420px] overflow-auto">
            <Image
              className="object-cover w-full h-full"
              width="100%"
              preview={{ mask: false }}
              src={data.course.image_url}
            />
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("TABLE.EMPTY")}
          />
        )}
      </Row>
    </>
  );
};

export default Timeline;
