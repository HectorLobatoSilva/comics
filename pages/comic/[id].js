import { Button, Container, Image, Row, Spacer, Text } from "@nextui-org/react";
import Head from "next/head";
import { Header } from "components/Header";

import fs from "fs/promises";
import Link from "next/link";
import { basename } from "path";

export default function Comic({
  img,
  alt,
  title,
  hastPrev,
  hasNext,
  prevId,
  nextId,
}) {
  return (
    <Container md>
      <Head>
        <title>XKCD For developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Text h1 css={{ textAlign: "center" }}>
        {title}
      </Text>
      <Image
        layout="intrinsic"
        objectFit="contain"
        width="100%"
        height="auto"
        alt={alt}
        src={img}
        css={{
          maxHeight: "45rem",
        }}
      />
      <Spacer />
      <Text css={{ textAlign: "center" }}>{alt}</Text>
      <Spacer />
      <Row justify="center">
        {hastPrev && (
          <Link href={`/comic/${prevId}`} passHref>
            <Button auto color="secondary" rounded>
              ⬅︎ Previus
            </Button>
          </Link>
        )}
        <Spacer />
        {hasNext && (
          <Link href={`/comic/${nextId}`} passHref>
            <Button auto color="primary" rounded>
              Next ➡︎
            </Button>
          </Link>
        )}
      </Row>
      <Spacer />
    </Container>
  );
}

export async function getStaticPaths() {
  const files = await fs.readdir("./comics");
  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const file = await fs.readFile(`./comics/${params.id}.json`, "utf8");
  const comic = JSON.parse(file);

  const prevId = Number(params.id) - 1;
  const nextId = Number(params.id) + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    fs.stat(`./comics/${prevId}.json`),
    fs.stat(`./comics/${nextId}.json`),
  ]);

  const hastPrev = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hastPrev,
      hasNext,
      prevId,
      nextId,
    },
  };
}
