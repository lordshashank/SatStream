import { Database } from "@tableland/sdk";
import { Registry, helpers } from "@tableland/sdk";
import { useState } from "react";

export default function useDatabase() {
  const db = new Database();
  // const [databaseName, setDatabaseName] = useState("");
  //   const { getContractReceipt } = helpers;
  // calib_80001_6978
  //calib_314159_193
  async function getHealthCheck() {
    const tableName = "healthbot_80001_1"; // Our pre-defined health check table

    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
  }
  async function createDatabase(prefix) {
    // This is the table's `prefix`--a custom table value prefixed as part of the table's name
    // const prefix = "my_sdk_table";
    try {
      const { meta: create } = await db
        .prepare(`CREATE TABLE ${prefix} (id integer primary key, name text);`)
        .run();
      // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
      console.log("dd");
      console.log(create.txn.name); // e.g., my_sdk_table_80001_311

      return create.txn.name;
    } catch (error) {
      console.log(error);
    }
  }
  async function writeInDatabase(name, index, data) {
    try {
      // Insert a row into the table
      const { meta: insert } = await db
        .prepare(`INSERT INTO ${name} (id, name) VALUES (?, ?);`)
        .bind(index, data)
        .run();
      console.log(insert);
      // Wait for transaction finality
      await insert.txn.wait();
      return "Row inserted";
    } catch (error) {
      console.log(error);
    }
  }
  async function readDatabase(name) {
    try {
      // Perform a read query, requesting all rows from the table
      const { results } = await db.prepare(`SELECT * FROM ${name};`).all();
      console.log(results);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
  async function getDatabases() {
    try {
      // List my tables
      const reg = new Registry(db.config); // Must have a signer

      const results =
        await reg.listTables(/* default to connected wallet address */);
      console.log(results);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
  async function transferDatabase(tableName, toAddress) {
    try {
      // Transfer a table to another address
      const tx = await reg.safeTransferFrom({
        to: toAddress,
        tableName: tableName, // Also accepts name as string
      });
      // Tableland adopts this "wait" style pattern from ethers!
      await tx.wait();
      return `Table ${tableName} transferred to ${toAddress}`;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getHealthCheck,
    createDatabase,
    writeInDatabase,
    readDatabase,
    getDatabases,
    transferDatabase,
  };
}
