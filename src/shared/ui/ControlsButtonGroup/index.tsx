import React, { FC } from "react";
import { Button, Flex } from "antd";

import {
  CaretRightOutlined,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

type Props = {
  disabled?: boolean;
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
  disabled,
}) => (
  <Flex gap={30} align="center">
    <Button
      type="primary"
      shape="circle"
      icon={
        <StepBackwardOutlined style={{ fontSize: 20, marginLeft: "-2px" }} />
      }
      onClick={onBackwardClick}
      style={{ width: 48, height: 48 }}
      disabled={disabled}
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
      disabled={disabled}
    />
    <Button
      type="primary"
      shape="circle"
      icon={
        <StepForwardOutlined style={{ fontSize: 20, marginRight: "-2px" }} />
      }
      onClick={onForwardClick}
      style={{ width: 48, height: 48 }}
      disabled={disabled}
    />
  </Flex>
);
