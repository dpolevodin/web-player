import { FC } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Tooltip, Upload } from "antd";
import type { UploadFile } from "antd";

const ACCEPTED_FORMATS = ".mp3";

export type UploadButtonProps = {
  onUpload?: (file: UploadFile) => void;
  fileList?: UploadFile[];
};

export const UploadButton: FC<UploadButtonProps> = ({ onUpload, fileList }) => {
  const beforeUploadHandler = (file: UploadFile) => {
    if (onUpload) {
      onUpload(file);
    }
    return false;
  };

  return (
    <Upload
      accept={ACCEPTED_FORMATS}
      beforeUpload={beforeUploadHandler}
      fileList={fileList}
      showUploadList={false}
    >
      <Tooltip title="Upload audio">
        <Button icon={<UploadOutlined />} shape="circle" size="large"></Button>
      </Tooltip>
    </Upload>
  );
};
