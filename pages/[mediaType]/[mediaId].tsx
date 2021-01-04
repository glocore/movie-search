import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

const MediaInfo = ({
  mediaDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(mediaDetails, null, 2)}</div>;
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { TMDB_API, TMDB_API_KEY } = process.env;
  const { params } = context;
  const url = `${TMDB_API}/${params.mediaType}/${params.mediaId}?api_key=${TMDB_API_KEY}`;

  const res = await fetch(url);
  const mediaDetails = await res.json();

  return {
    props: {
      mediaDetails,
    },
    revalidate: 1,
  };
};

export default MediaInfo;
