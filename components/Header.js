import { Container, Text, Link as NextLink } from "@nextui-org/react";
import Link from "next/link";
import { Search } from "./Search";
import { Theme } from "./Theme";

export function Header() {
  return (
    <Container responsive display="flex" justify="space-around">
      <div>
        <Link href="/" passHref>
          <NextLink as="a">
            <Text small b>
              Next{" "}
            </Text>
            <Text span> XKCD</Text>
          </NextLink>
        </Link>
      </div>
      <nav>
        <Container
          display="flex"
          direction="row"
          responsive
          style={{ gap: 16 }}
          alignItems="center"
        >
          <Link href="/" passHref>
            <NextLink as="a">
              <Text b>Home</Text>
            </NextLink>
          </Link>
          <Search />
          <Theme />
        </Container>
      </nav>
    </Container>
  );
}
