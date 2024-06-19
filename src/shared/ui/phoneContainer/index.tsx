import React, { FC, PropsWithChildren } from "react";
import { Image } from "antd";
import image from "./assets/phone.png";
import { ReactComponent as Logo } from "./assets/phone.svg";

// TODO: изменение размеров телефона в зависимости от ширины экрана
export const PhoneContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ position: "relative" }}>
      {/* <div
        style={{
          backgroundImage: "url(" + "/assets/phone.png" + ")",
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          zIndex: 200,
          width: 400,
          height: 600,
        }}
      ></div> */}
      {/* <div
        style={{
          position: "absolute",
          width: 800,
          height: "auto",
          background: "white",
        }}
      ></div>
      <Image width={800} src={image} preview={false}>
        {children}
      </Image> */}
      <Logo style={{ width: 320, height: "auto" }} />
      {/* <img src={image} /> */}
    </div>
    // <Image width={800} src={imagePath} preview={false}>
    //   {children}
    // </Image>
  );
};
