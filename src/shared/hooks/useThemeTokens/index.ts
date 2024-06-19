import { theme as dsTheme, type GlobalToken } from "antd";

export const useThemeTokens = (): GlobalToken => {
  const { useToken } = dsTheme;
  const { token: theme } = useToken();

  return theme;
};
