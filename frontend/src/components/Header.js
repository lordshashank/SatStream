"use client";
import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
import useDealStatus from "./useDealStatus";
import { BiSolidVideoPlus } from "react-icons/bi";
import Link from "next/link";
import classes from "@/styles/Header.module.css";
export default function Header() {
  const { account } = useMoralis();
  console.log(account);
  const { submitCid } = useDealStatus();
  const cid = "QmWM53RskqrsNDvC8GpKHuUPGY3mRZ86yXLGfewijdYnnF";
  return (
    // <div>
    //   Header
    //   <ConnectButton moralisAuth={false} />
    //   <button
    //     onClick={async () => {
    //       await submitCid(cid);
    //       registerJobForm();
    //     }}
    //   >
    //     submit
    //   </button>
    // </div>
    <div className={classes["header"]}>
      <div className={classes["logo"]}>
        <h2>SatStream</h2>
      </div>
      <div className={classes["search-bar"]}>
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </div>
      <Link href={"/upload"} className={classes["upload-btn"]}>
        <BiSolidVideoPlus size={30} color="#f00" />
      </Link>
      <div>
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
