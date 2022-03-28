export default function Booking(props) {
  return <div>{JSON.stringify(props.query)}</div>;
}

export async function getServerSideProps({ req, query }) {
  const site = req.headers.host;

  return {
    props: { query, site },
  };
}
