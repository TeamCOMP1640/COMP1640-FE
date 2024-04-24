import React from "react";
import { Typography, Image, Card } from "antd";
import { Title } from "chart.js";
import { useParams } from "react-router-dom";
import { useGetArticle } from "@app/hooks/useArticle";

const ArticleDetail: React.FC = () => {
  const { Title, Paragraph } = Typography;
  const { id } = useParams();

  const { data } = useGetArticle(id || "");

  console.log(data);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          hoverable
          style={{
            maxWidth: 900,
            margin: "30px auto",
            overflowY: "scroll",
            maxHeight: "900px",
          }}
        >
          <Title>{data?.title}</Title>
          <Image
            width={800}
            height={500}
            alt={data?.title}
            src={data?.image_url}
          />
          <Paragraph>{data?.publication_content}</Paragraph>
        </Card>
      </div>
    </React.Fragment>
  );
};
export default ArticleDetail;
