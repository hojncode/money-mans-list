import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ res }) {
  // const router = useRouter();
  // console.log(router);

  // const onClickPerson = (dtId) => {
  //   console.log(dtId);
  //   // router.push(`/person/${dtId}`);
  // };

  return (
    <div>
      <div className="title">
        <span>All the Billionaries</span>
      </div>
      <div className="container">
        {res?.map((dt) => {
          if (dt.id.length < 50) {
            return (
              <div
                key={dt.id}
                className="eachItemBox"
                // onClick={() => {
                //   onClickPerson(dt.id);
                // }}
              >
                <div className="name">{dt.name}</div>{" "}
                <Link href={`/person/${dt.id}`}>
                  <img className="img" src={`${dt.squareImage}`} />

                  <div className="info">
                    <span className="money">
                      $ {Math.trunc(dt.netWorth / 1000)} Billion{" "}
                    </span>
                    <span className="company">{dt.industries}</span>
                  </div>
                </Link>
              </div>
            );
          }
        })}
      </div>
      <style jsx>{`
        div {
          margin: 20px;
        }
        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #7f8fa6;
          font-size: 50px;
          margin-top: 50px;
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 10px;
          padding: 50px 50px;
          color: #dcdde1;
        }
        .img {
          width: 18rem;
        }
        .eachItemBox {
          background-color: #353b48;
          cursor: pointer;
          width: 18rem;
        }
        .name {
          font-size: 30px;
        }
        .money {
          color: #e1b12c;
        }
        .info {
          display: flex;
          flex-direction: column;
          font-size: 20px;
          color: #7f8fa6;
        }
        .company {
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await (
    await fetch(`https://billions-api.nomadcoders.workers.dev/`)
  ).json();
  return {
    props: {
      res,
    },
  };
}
