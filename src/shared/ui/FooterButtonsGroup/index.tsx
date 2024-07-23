import { FC, Fragment } from "react";
import {
  UnorderedListOutlined,
  CustomerServiceOutlined,
  SoundOutlined,
  MutedOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import styles from "./styles.module.css";

type Props = {
  isTrackListView?: boolean;
  isMuted?: boolean;
  onListClick?: () => void;
  onMuteClick?: () => void;
  muteDisabled?: boolean;
};

export const FooterButtonsGroup: FC<Props> = ({
  isTrackListView,
  onListClick,
  onMuteClick,
  isMuted,
  muteDisabled,
}) => (
  <Fragment>
    <Tooltip title={isTrackListView ? "Back to player" : "Go to playlist"}>
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
        onClick={onListClick}
        className={styles.listButton}
      />
    </Tooltip>
    <Tooltip title={isMuted ? "Unmute" : "Mute"}>
      <Button
        type="text"
        icon={
          isMuted ? (
            <MutedOutlined className={styles.buttonIcon} />
          ) : (
            <SoundOutlined className={styles.buttonIcon} />
          )
        }
        shape="circle"
        size="large"
        onClick={onMuteClick}
        className={styles.muteButton}
        disabled={muteDisabled}
      />
    </Tooltip>
  </Fragment>
);
