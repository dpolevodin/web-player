import { FC, Fragment } from "react";
import { Slider, SliderSingleProps } from "antd";

const SECONDS_IN_HOUR = 3600;

const formatToSeconds = (value?: number) => {
  if (!value) {
    return;
  }

  const formattedSeconds = new Date(value * 1000).toISOString();

  return value < SECONDS_IN_HOUR
    ? formattedSeconds.substring(14, 19)
    : formattedSeconds.substring(11, 19);
};

type Props = SliderSingleProps & { width?: number | string };

export const ProgressSlider: FC<Props> = ({
  width,
  value,
  max,
  min,
  disabled,
  ...props
}) => {
  const currentValue = formatToSeconds(value);
  const maxValue = formatToSeconds(max);

  // TODO: убрать контрольные точки визуальные
  const marks: SliderSingleProps["marks"] = {
    [`${min}`]: `${value && value > 0 ? currentValue : "00:00"}`,
    [`${max}`]: `${maxValue}`,
  };

  return (
    <Fragment>
      <Slider
        max={max}
        min={min}
        value={value}
        tooltip={{ formatter: null }}
        keyboard
        style={{ width }}
        marks={disabled ? undefined : marks}
        disabled={disabled}
        {...props}
      />
    </Fragment>
  );
};
