import React, { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";
import image from "./assets/phone.png";
import classNames from "classnames";

type Props = {
  isDarkMode?: boolean;
};
// TODO: доделать изменение размеров телефона в зависимости от ширины экрана
export const PhoneContainer: FC<PropsWithChildren<Props>> = ({
  isDarkMode,
  children,
}) => {
  return (
    <div className={styles.phoneWrapper}>
      <img
        width={"100%"}
        src={image}
        alt="phone-template"
        className={styles.phoneImage}
      />
      <div className={styles.phoneSpeaker} />
      <div
        className={classNames(styles.phoneContentContainer, {
          [styles.phoneSpeaker_darkened]: isDarkMode,
        })}
      >
        {children}
      </div>
    </div>
  );
};
