import { FC, Fragment } from "react";
import { Slider, SliderSingleProps } from "antd";
import { formatToSeconds } from "./utils";

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
    [`${min}`]: `${
      value && value > 0 && currentValue ? currentValue : "00:00"
    }`,
    [`${max}`]: maxValue ? `${maxValue}` : "00:00",
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
        marks={marks}
        disabled={disabled}
        {...props}
      />
    </Fragment>
  );
};
