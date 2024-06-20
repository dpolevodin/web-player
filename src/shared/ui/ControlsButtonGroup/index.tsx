import React, { FC } from "react";
import { Button, Flex } from "antd";

import {
  CaretRightOutlined,
  PauseOutlined,
  BackwardOutlined,
  ForwardOutlined,
} from "@ant-design/icons";

type Props = {
  playing?: boolean;
  onPlayClick?: VoidFunction;
  onForwardClick?: VoidFunction;
  onBackwardClick?: VoidFunction;
};

export const ControlsButtonGroup: FC<Props> = ({
  onPlayClick,
  onForwardClick,
  onBackwardClick,
  playing,
}) => (
  <Flex gap="large">
    <Button
      type="primary"
      shape="circle"
      icon={<BackwardOutlined />}
      size="large"
      onClick={onBackwardClick}
    />
    <Button
      type="primary"
      shape="circle"
      icon={playing ? <PauseOutlined /> : <CaretRightOutlined />}
      size="large"
      onClick={onPlayClick}
    />
    <Button
      type="primary"
      shape="circle"
      icon={<ForwardOutlined />}
      size="large"
      onClick={onForwardClick}
    />
  </Flex>
);
