import { FC } from "react";
import {
  UnorderedListOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { Button, type ButtonProps, Tooltip } from "antd";
import styles from "./styles.module.css";

type Props = ButtonProps & { isTrackListView?: boolean };

export const TrackListButton: FC<Props> = ({ isTrackListView, onClick }) => (
  <Tooltip title={isTrackListView ? "back to player" : "go to playlist"}>
    <Button
      type="text"
      icon={
        isTrackListView ? (
          <CustomerServiceOutlined className={styles.buttonIcon} />
        ) : (
          <UnorderedListOutlined className={styles.buttonIcon} />
        )
      }
      shape="circle"
      size="large"
      onClick={onClick}
      className={styles.listButton}
    />
  </Tooltip>
);
