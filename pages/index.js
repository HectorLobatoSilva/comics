import Head from "next/head";
import { Card, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import { Header } from "../components/Header";
import fs from "fs/promises";
import Link from "next/link";
import { Footer } from "components/Footer";

export default function Home({ latestComics }) {
  return (
    <Container>
      <Head>
        <title>XKCD For developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Text h2 b css={{ textAlign: "center" }}>
          Latest Comics
        </Text>
        <Container md>
          <Grid.Container gap={2} justify="flex-start">
            {latestComics.map((comic) => (
              <Link href={`/comic/${comic.id}`} key={comic.id} passHref>
                <Grid xs={12} sm={4}>
                  <Card hoverable clickable bordered>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        layout="intrinsic"
                        objectFit="contain"
                        width="100%"
                        height={200}
                        src={comic.img}
                        alt={comic.alt}
                      />
                    </Card.Body>
                    <Card.Footer>
                      <Row wrap="wrap" justify="center">
                        <Text b>{comic.title}</Text>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid.Container>
          <Spacer />
          <Footer />
        </Container>
      </main>
    </Container>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./comics");
  const lastComicsFiles = files.slice(-9, files.length);

  const promisesReadFile = lastComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFile);
  return {
    props: {
      latestComics,
    },
  };
}
