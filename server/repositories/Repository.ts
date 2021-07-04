import knex, { raw } from "objection";
import { DB } from "../db/utils/DB";
import errorlog from "../utils/errorlog";

export class Repository {
	public readonly raw = raw;
	public readonly DB = DB;
	public readonly knex = knex;
	public readonly errorlog = errorlog;
}