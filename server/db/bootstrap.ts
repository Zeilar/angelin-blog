import knex from "knex";
import { Model } from "objection";
import { development } from "../../knexfile";

export default function bootstrap(): void {
	Model.knex(knex(development));
}
