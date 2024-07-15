import React, { PropsWithChildren, FC, useState } from "react";
import { Typography } from "antd";
import { MAX_CONTENT_WIDTH } from "../../../constants";
import styles from "./styles.module.css";
import classNames from "classnames";

const { Text } = Typography;

export const FileNameText: FC<PropsWithChildren> = ({ children }) => {
  const [ticker, setTicker] = useState(false);
  return (
    <div
      style={{ maxWidth: MAX_CONTENT_WIDTH }}
      className={styles.tickerWrapper}
    >
      <Text
        className={classNames({
          [styles.ticker]: ticker,
        })}
        style={{ maxWidth: MAX_CONTENT_WIDTH, opacity: 0 }}
        ellipsis={{
          onEllipsis: (ellipsis) => {
            console.log(ellipsis, "ellipsis");
            setTicker(ellipsis);
          },
        }}
      >
        {children}
      </Text>
      <Text
        style={{ maxWidth: MAX_CONTENT_WIDTH }}
        className={classNames({
          [styles.tickerVisible]: ticker,
        })}
      >
        {children}
      </Text>
    </div>
  );
};
