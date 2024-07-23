import { FC, useState } from "react";
import {
  Empty,
  Space,
  SpaceProps,
  List,
  Badge,
  Button,
  Typography,
} from "antd";
import { MAX_CONTENT_WIDTH } from "../../../constants";
import { AudioFile } from "../../types/types";
import { formatToSeconds } from "../ProgressSlider/utils";
import { DeleteOutlined } from "@ant-design/icons";

type Props = SpaceProps & {
  list: AudioFile[];
  playingFileInfo?: AudioFile;
  onItemClick?: (item: AudioFile) => void;
  deleteButtonOnClick?: (uid: string) => void;
};

const { Text } = Typography;

export const TrackList: FC<Props> = ({
  list,
  playingFileInfo,
  onItemClick,
  deleteButtonOnClick,
  ...props
}) => {
  const [trackUidHovered, setUidTrackHovered] = useState<string | null>(null);
  const playingFileUid = playingFileInfo?.playing
    ? playingFileInfo.uid
    : undefined;

  const handleItemClick = (item: AudioFile) => () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleDeleteClick = (uid: string) => () => {
    if (deleteButtonOnClick) {
      deleteButtonOnClick(uid);
    }
  };

  return (
    <Space direction="vertical" size="small" align="start" {...props}>
      {list.length ? (
        <List
          size="small"
          dataSource={list}
          renderItem={(item) => {
            const { name, uid } = item;

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  width: "100%",
                }}
                onMouseEnter={() => {
                  setUidTrackHovered(uid);
                }}
                onMouseLeave={() => {
                  setUidTrackHovered(null);
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                  key={name}
                >
                  <Badge
                    status={playingFileUid === uid ? "processing" : "success"}
                  />
                  <Button
                    onClick={handleItemClick(item)}
                    type="link"
                    style={{
                      maxWidth: 180,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      justifyContent: "flex-start",
                      padding: 0,
                    }}
                  >
                    {name}
                  </Button>
                </div>
                {trackUidHovered !== uid && (
                  <Text type="secondary">
                    {formatToSeconds(item?.duration) ?? "00:00"}
                  </Text>
                )}
                {trackUidHovered === uid && (
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    shape="circle"
                    size="small"
                    onClick={handleDeleteClick(uid)}
                  />
                )}
              </div>
            );
          }}
          style={{ width: props?.style?.width ?? MAX_CONTENT_WIDTH }}
        />
      ) : (
        <Empty description="add files to see a list of audio recordings" />
      )}
    </Space>
  );
};
