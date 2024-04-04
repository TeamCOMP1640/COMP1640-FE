import { TagStatus } from "@app/components/atoms/TagStatus/TagStatus";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  course: any[];
};

export const CourseTag: FC<Props> = ({ course }) => {
  const navigate = useNavigate();

  let displayedText = course.slice(0, 2);
  let additionalCount = course.length - 2;

  if (additionalCount > 0) {
    displayedText.push(`+${additionalCount}`);
  }

  return (
    <>
      {displayedText.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {index < 2 ? (
            <button onClick={() => navigate(`/courses/${item.id}`)}>
              <TagStatus status={item.name} translate={false} />
            </button>
          ) : (
            <TagStatus status={item} translate={false} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};
