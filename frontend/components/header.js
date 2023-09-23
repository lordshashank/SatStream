import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
import useDealStatus from "./useDealStatus";
export default function Header() {
  const { account } = useMoralis();
  console.log(account);
  const { submitCid } = useDealStatus();
  const cid = "QmWM53RskqrsNDvC8GpKHuUPGY3mRZ86yXLGfewijdYnnF";
  return (
    <div>
      Header
      <ConnectButton moralisAuth={false} />
      <button
        onClick={async () => {
          await submitCid(cid);
          // registerJobForm();
        }}
      >
        submit
      </button>
    </div>
  );
}
