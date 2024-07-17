import { FC } from "react";
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

type Props = SpaceProps & {
  list: AudioFile[];
  playingFileInfo?: AudioFile;
  onItemClick?: (item: AudioFile) => void;
};

const { Text } = Typography;

export const TrackList: FC<Props> = ({
  list,
  playingFileInfo,
  onItemClick,
  ...props
}) => {
  const playingFileUid = playingFileInfo?.playing
    ? playingFileInfo.uid
    : undefined;

  const handleItemClick = (item: AudioFile) => () => {
    console.log(item.name, "click");
    if (onItemClick) {
      onItemClick(item);
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
                <Text type="secondary">
                  {formatToSeconds(item?.duration) ?? "00:00"}
                </Text>
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
