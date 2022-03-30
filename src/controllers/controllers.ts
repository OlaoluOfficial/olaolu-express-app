import { Request, Response } from 'express';
import {
  getDb,
  createRecord,
  getSingleRec,
  deleteRecord,
  updateRecord,
} from '../model/model';

export async function getAllUsers(req: Request, res: Response) {
  const database = await getDb();
  res.end(database);
}

export async function createUser(req: Request, res: Response) {
  const input = req.body;
  const body = await createRecord(input);
  res.end(JSON.stringify(body));
}

export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const database = await getDb();
  const data = await getSingleRec(id);
  res.end(JSON.stringify(data));
}

export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const input = req.body;
  const body = await updateRecord(id, input);
  res.end(JSON.stringify(body));
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const body = await deleteRecord(id);
  res.end(JSON.stringify(body));
}

export default {
  getAllUsers,
  getDb
}