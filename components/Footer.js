import { Container, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";

export function Footer() {
  return (
    <Container css={{ textAlign: "center" }}>
      <Text b>Disclaimer</Text>
      <Text>
        This a exercice to clone XKCD webpage with{" "}
        <strong>NextJs and NextUI</strong>, please visit his website{" "}
        <Link href="https://xkcd.com/">xkcd.com</Link>
      </Text>
      <Spacer />
    </Container>
  );
}
