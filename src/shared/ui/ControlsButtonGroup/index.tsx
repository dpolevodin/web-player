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
  <Flex gap={30} align="center">
    <Button
      type="primary"
      shape="circle"
      icon={<BackwardOutlined style={{ fontSize: 20, marginLeft: "-2px" }} />}
      onClick={onBackwardClick}
      style={{ width: 48, height: 48 }}
    />
    <Button
      type="primary"
      shape="circle"
      icon={
        playing ? (
          <PauseOutlined style={{ fontSize: 24 }} />
        ) : (
          <CaretRightOutlined style={{ fontSize: 28, marginRight: "-4px" }} />
        )
      }
      onClick={onPlayClick}
      style={{ width: 60, height: 60 }}
    />
    <Button
      type="primary"
      shape="circle"
      icon={<ForwardOutlined style={{ fontSize: 20, marginRight: "-2px" }} />}
      onClick={onForwardClick}
      style={{ width: 48, height: 48 }}
    />
  </Flex>
);
