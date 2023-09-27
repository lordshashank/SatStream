"use client";
import classes from "@/styles/Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();
  const activeClassName = function (path) {
    return `${pathname == path ? classes.active : ""}`;
  };
  return (
    <div className={classes.sidebar}>
      <ul className={classes["nav-links-list"]}>
        <li className={classes["nav-link"]}>
          <Link className={activeClassName("/dashboard")} href={"/"}>
            Dashboard
          </Link>
        </li>
        <li className={classes["nav-link"]}>
          <Link className={activeClassName("/upload")} href={"/upload"}>
            Upload
          </Link>
        </li>
        <li className={classes["nav-link"]}>
          <Link
            className={activeClassName("/your-videos")}
            href={"/your-videos"}
          >
            Your Videos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
