import { FC, Fragment } from "react";
import { Empty, Space, SpaceProps, List, Badge } from "antd";
import { MAX_CONTENT_WIDTH } from "../../../constants";
import { AudioFile } from "../../types/types";
import { formatToSeconds } from "../ProgressSlider/utils";

type Props = SpaceProps & {
  list: AudioFile[];
  playingFileInfo?: AudioFile;
};

export const TrackList: FC<Props> = ({ list, playingFileInfo, ...props }) => {
  const playingFileUid = playingFileInfo?.playing
    ? playingFileInfo.uid
    : undefined;
  return (
    <Space direction="vertical" size="small" align="start" {...props}>
      {list.length ? (
        <List
          size="small"
          dataSource={list}
          renderItem={(item) => (
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
                key={item.name}
              >
                <Badge
                  status={
                    playingFileUid === item.uid ? "processing" : "success"
                  }
                />
                <div
                  style={{
                    maxWidth: 180,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </div>
              </div>
              <div>{formatToSeconds(item?.duration) ?? "00:00"}</div>
            </div>
          )}
          style={{ width: props?.style?.width ?? MAX_CONTENT_WIDTH }}
        />
      ) : (
        <Empty description="add files to see a list of audio recordings" />
      )}
    </Space>
  );
};
