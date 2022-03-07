import { useTheme as useNextTheme } from "next-themes";
import { Switch, Text, useTheme } from "@nextui-org/react";
export function Theme() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <>
      <Text>
        <strong>{type}</strong> theme
      </Text>
      <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
    </>
  );
}
