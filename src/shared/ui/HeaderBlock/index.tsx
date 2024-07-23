import { FC } from "react";

import { Flex } from "antd";
import {
  AddToFavoriteButton,
  AddToFavoriteButtonProps,
} from "./components/AddToFavoriteButton";
import { UploadButton, UploadButtonProps } from "./components/UploadButton";

type Props = {
  onUpload?: UploadButtonProps["onUpload"];
  onAddToFavorite?: AddToFavoriteButtonProps["onClick"];
  addedToFavorite?: AddToFavoriteButtonProps["added"];
  addedToFavoriteDisabled?: AddToFavoriteButtonProps["addedToFavoriteDisabled"];
};

export const HeaderBlock: FC<Props> = ({
  onUpload,
  onAddToFavorite,
  addedToFavorite,
  addedToFavoriteDisabled,
}) => (
  <Flex align="center" gap={132} style={{ paddingBottom: "0.5rem" }}>
    <AddToFavoriteButton
      onClick={onAddToFavorite}
      added={addedToFavorite}
      addedToFavoriteDisabled={addedToFavoriteDisabled}
    />
    <UploadButton onUpload={onUpload} />
  </Flex>
);
