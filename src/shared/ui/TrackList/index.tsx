import { FC } from "react";
import { Empty, Space, SpaceProps, List } from "antd";
import { MAX_CONTENT_WIDTH } from "../../../constants";

type Props = SpaceProps & {
  list: string[];
};

export const TrackList: FC<Props> = ({ list, ...props }) => {
  return (
    <Space direction="vertical" size="small" align="start" {...props}>
      {list.length ? (
        <List
          size="small"
          dataSource={list}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          style={{ width: props?.style?.width ?? MAX_CONTENT_WIDTH }}
        />
      ) : (
        <Empty description="add files to see a list of audio recordings" />
      )}
    </Space>
  );
};
