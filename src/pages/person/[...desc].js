import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Desc(response) {
  const router = useRouter();
  const [personDesc, setPersonDesc] = useState();
  // console.log(router.query.desc.join());
  // console.log(desc);
  // console.log(response.response);
  // console.log(personDesc);

  useEffect(() => {
    (async () => {
      setPersonDesc(response.response);
    })();
  }, []);

  return (
    <div className="container">
      <div className="first-box">
        <img src={`${personDesc?.squareImage}`} />
        <div className="name">{personDesc?.name}</div>
        <div>NetWorth: {Math.trunc(personDesc?.netWorth / 1000)} Billion</div>
        <div>Country: {personDesc?.country}</div>
        <div>Industry: {personDesc?.industries}</div>
        <div className="blahblah">{personDesc?.bio}</div>
      </div>
      <div className="second-box ">
        <div>
          <spann className="fa">Financial Assets</spann>
        </div>
        <div className="second-box-grid ">
          {personDesc?.financialAssets?.map((tt, i) => (
            <div className="second-box_container" key={i}>
              <div>Ticker: {tt?.ticker}</div>
              <div>Shares: {tt?.numberOfShares}</div>
              <div>Excersie Price ${tt?.sharePrice}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        div {
          margin: 18px;
        }
        .container {
          display: grid;
          grid-template-rows: 1fr;
          gap: 50px;
          margin: 100px;
          color: #dcdde1;
        }
        .first-box {
          padding: 30px;
          background-color: #353b48;
        }
        .name {
          font-size: 36px;
        }
        .blahblah {
          font-size: 18px;
          color: #7f8fa6;
        }
        .second-box {
          padding: 30px;
          background-color: #353b48;
        }

        .second-box-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        .second-box_container {
          border: 1px solid #7f8fa6;
          border-radius: 10px;
          font-size: 18px;
          color: #dcdde1;
        }

        .fa {
          padding-left: 20px;
          font-size: 30px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params: { desc } }) {
  // console.log({ params: { desc } });
  let obj = { params: { desc } };
  let name = obj.params.desc.join();
  // console.log(typeof name);
  const response = await (
    await fetch(`https://billions-api.nomadcoders.workers.dev/person/${name}`)
  ).json();
  // console.log(response);

  return {
    props: {
      response,
    },
  };
}
