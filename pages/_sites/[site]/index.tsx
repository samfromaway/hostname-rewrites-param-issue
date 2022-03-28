export default function Index(props) {
  return <a href="/booking?startDate=2022-04-14">This works</a>;
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // fallback true allows sites to be generated using ISR
  };
}

export async function getStaticProps({ params: { site } }) {
  const data = `${site}-index`;

  return {
    props: { data },
    revalidate: 3600, // set revalidate interval of 1h
  };
}
