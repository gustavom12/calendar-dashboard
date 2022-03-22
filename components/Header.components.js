import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ChevronLeft } from "react-feather";

export default function Header({ title, children, withBackbutton }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Fichap hiring | {title}</title>
      </Head>
      <div className="header-container">
        <div className="header-container-l">
          {withBackbutton && (
            <button
              onClick={() => router.back()}
              className="header-container-b"
              type="button"
            >
              <ChevronLeft style={{ color: "#FFF" }} />
            </button>
          )}
          <h1>{title}</h1>
        </div>
        {children}
      </div>
    </>
  );
}
