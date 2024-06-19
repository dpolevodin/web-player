import { FC } from "react";
import { FloatButton, FloatButtonProps, theme } from "antd";
import { MoonOutlined, MoonFilled } from "@ant-design/icons";
import { useThemeTokens } from "../../hooks/useThemeTokens";

type Props = {
  onClick: FloatButtonProps["onClick"];
  isDarkMode?: boolean;
};

export const ThemeSwitcher: FC<Props> = ({ onClick, isDarkMode }) => {
  const theme = useThemeTokens();
  return (
    <FloatButton
      style={{ top: "1rem" }}
      onClick={onClick}
      icon={
        isDarkMode ? (
          <MoonFilled style={{ color: theme["yellow-7"] }} />
        ) : (
          <MoonOutlined />
        )
      }
    />
  );
};
