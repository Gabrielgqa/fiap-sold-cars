import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sales', (table) => {
        table.increments('id').primary();
        table.string('cpf_buyer');
        table.uuid('car_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('sales');
}

