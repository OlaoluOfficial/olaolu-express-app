import { readFile, writeFile } from 'fs';
import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const readerPromise = promisify(readFile);
const writePromise = promisify(writeFile);

interface out {
  organization: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
}

const db_path = path.join(__dirname, '../../..', '/data/database.json');

export async function getDb() {
  try {
    return await readerPromise(db_path, { encoding: 'utf8', flag: 'r' });
  } catch (error) {
    await writePromise(db_path, JSON.stringify([]));
    return await readerPromise(db_path, { encoding: 'utf8', flag: 'r' });
  }
}
export async function getSingleRec(id: number) {
  const database = await getDb();
  const data = JSON.parse(database);
  const singleRec = data.find((rec: any) => rec.id === id);
  if (!singleRec) {
    return `Cannot find record with id ${id}. Please enter a valid id`;
  }
  return singleRec;
  // let data = await getDb();
  // let database = JSON.parse(data);
  // database = database.find((rec: { id: number }) => rec.id === id);
  // return JSON.stringify(database);
}
export async function createRecord(record: out) {
  const data = await getDb();
  let database = JSON.parse(data);
  const newDatabase = {
    ...record,
    id: database.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  database.push(newDatabase);
  await writePromise(db_path, JSON.stringify(database));
  return database;
}

export async function updateRecord(id: number, info: any) {
  const data = await getDb();
  let database = JSON.parse(data);
  const index = database.findIndex((rec: { id: number }) => rec.id === id);
  if (index === -1) {
    return `Cannot update this record because its id(${id}) does not exist. Please enter a valid id`;
  }
  database[index] = {
    ...database[index],
    ...info,
    updatedAt: new Date().toISOString(),
  };
  await writePromise(db_path, JSON.stringify(database));
  return database[index];
}

export async function deleteRecord(id: number) {
  const data = await getDb();
  let database = JSON.parse(data);
  const index = database.findIndex((rec: { id: number }) => rec.id === id);
  if (index === -1) {
    return `Cannot find record with id ${id}. Please enter a valid id`;
  }
  database.splice(index, 1);
  await writePromise(db_path, JSON.stringify(database));
  return `Deleted record with id ${id}`;
}
// const data = await getDb();
// let database = JSON.parse(data);
// const index = database.findIndex((rec: { id: number }) => rec.id === id);
// if (!index) {
//   return `Cannot find the record with id ${id}. Please enter a valid id`;
// }
// database.splice(index, 1);
// await writePromise(db_path, JSON.stringify(database));
// return database;

// let data = await getDb();
// let database = JSON.parse(data);
// database = database.filter((rec: { id: number }) => rec.id !== id);
// await writePromise(db_path, JSON.stringify(database));
// return database;
// }
export { db_path, readerPromise };
