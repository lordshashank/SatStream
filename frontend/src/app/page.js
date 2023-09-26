import Header from "@/components/header";
import classes from "@/styles/Page.module.css";

export default function Page() {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <main className={classes.main}>
          <h1 className={classes.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </main>
      </div>
    </>
  );
}
