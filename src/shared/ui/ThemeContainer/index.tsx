import { FC, PropsWithChildren } from "react";
import { Space } from "antd";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  isDarkMode: boolean;
};

export const ThemeContainer: FC<PropsWithChildren<Props>> = ({
  children,
  isDarkMode,
}) => {
  return (
    <Space
      direction="vertical"
      align="center"
      className={classNames(styles.container, {
        [styles.container_darkMode]: isDarkMode,
        [styles.container_lightMode]: !isDarkMode,
      })}
    >
      {children}
    </Space>
  );
};
