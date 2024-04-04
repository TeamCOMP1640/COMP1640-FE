import { Button } from "@app/components/atoms/Button/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "./NotFound.scss";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="not-found pt-16 w-screen h-screen flex flex-col justify-center items-center gap-1">
      <h1>404</h1>
      <p className="text-4xl text-center font-thin">
        {t("VALIDATE.NOT_FOUND")}
      </p>
      <div className="mt-2rem w-full flex justify-center h-80">
        <Button
          className="p-2 bg-blue-500"
          type="dashed"
          onClick={() => navigate("/")}
        >
          {t("BUTTON.BACK_HOME")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
