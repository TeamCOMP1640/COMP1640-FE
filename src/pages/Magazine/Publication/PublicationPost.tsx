import React from "react";
import { Card, Typography } from "antd";
import Title from "antd/es/skeleton/Title";

const { Meta } = Card;

const PublicationPost = () => {
  // Sample data for demonstration
  const articles = [
    {
      id: 1,
      title: "Article 1",
      description:
        "Discover the latest trends in technology and innovation with our comprehensive coverage of cutting-edge topics.",
      imageUrl: "https://source.unsplash.com/random/300x200?sig=1",
    },
    {
      id: 2,
      title: "Article 2",
      description:
        "Explore the fascinating world of science and research through in-depth articles and insightful analyses.",
      imageUrl: "https://source.unsplash.com/random/300x200?sig=2",
    },
    {
      id: 3,
      title: "Article 3",
      description:
        "Stay up-to-date with the most important news and events happening around the globe with our timely reporting and expert commentary.",
      imageUrl: "https://source.unsplash.com/random/300x200?sig=3",
    },
    // Add more articles as needed
  ];

  // Shuffle the articles array to get random articles
  const shuffledArticles = articles.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div style={{ padding: "100px" }}>
      {/* <Typography>List Publication Article of faculty</Typography> */}
      <div className="grid grid-cols-3 gap-8">
        {shuffledArticles.map((article) => (
          <Card
            key={article.id}
            hoverable
            cover={<img alt={article.title} src={article.imageUrl} />}
            style={{ width: 300 }}
          >
            <Meta title={article.title} description={article.description} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PublicationPost;
