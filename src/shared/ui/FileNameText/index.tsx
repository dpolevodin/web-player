import { PropsWithChildren, FC } from "react";
import { Typography, Badge, Space } from "antd";
import { MAX_CONTENT_WIDTH } from "../../../constants";

const { Text } = Typography;

type Props = {
  playing: boolean;
};

export const FileNameText: FC<PropsWithChildren<Props>> = ({
  playing,
  children,
}) => {
  return (
    <Space size="small" style={{ marginTop: 16 }}>
      <Badge status={playing ? "processing" : "success"} />
      <Text
        style={{ maxWidth: MAX_CONTENT_WIDTH }}
        strong
        ellipsis={{
          tooltip: true,
        }}
      >
        {children}
      </Text>
    </Space>
  );
};
