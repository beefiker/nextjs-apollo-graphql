import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import client from "../../apollo-client";
import { gql } from "@apollo/client";

export interface ICountry {
  __typename: string;
  code: string;
  name: string;
  emoji: string;
}

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

const Home: NextPage = ({
  initialData,
}: {
  initialData?: {
    countries: ICountry[];
  };
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Apollo + graphQL with <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div>
          {initialData &&
            initialData.countries.map((country: ICountry, idx: number) => (
              <div key={idx}>
                <p>
                  {country.emoji}
                  <strong>{country.code}</strong>: {country.name}
                </p>
              </div>
            ))}
        </div>
      </main>
      <h1 className={styles.title}>ServerSide</h1>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_COUNTRIES,
  });
  return {
    props: {
      initialData: {
        countries: data.countries,
      },
    },
  };
};

export default Home;
