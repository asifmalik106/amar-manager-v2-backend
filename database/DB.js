export default class DB {
    constructor(d1) {
        this.d1 = d1;
    }

    async getAllData(tableName) {
        const result = await this.d1.prepare(`SELECT * FROM ${tableName}`).all();
        return result.results;
    }

    async getDataById(id, tableName) {
        const result = await this.d1
            .prepare(`SELECT * FROM ${tableName} WHERE id = ?`)
            .bind(id)
            .all();
        return result.results;
    }

    async getDataByType(dataType, tableName) {
        const result = await this.d1
            .prepare(`SELECT * FROM ${tableName} WHERE type = ?`)
            .bind(dataType)
            .all();
        return result.results;
    }

    async create(data, tableName) {
        const keys = Object.keys(data);
        const placeholders = keys.map(() => '?').join(', ');
        const values = keys.map(k => data[k]);
        const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
        return await this.d1.prepare(sql).bind(...values).run();
    }

    async count(data, tableName) {
        const result = await this.d1
            .prepare(`SELECT COUNT(*) as count FROM ${tableName} WHERE ${data.attribute} = ?`)
            .bind(data.value)
            .first();
        return result ? result.count : 0;
    }

    async getAllEntities(tableName) {
        const result = await this.d1.prepare(`SELECT * FROM ${tableName}`).all();
        return result.results;
    }

    async getEntityByID(tableName, entityID) {
        return await this.d1
            .prepare(`SELECT * FROM ${tableName} WHERE id = ?`)
            .bind(entityID)
            .first();
    }

    // updates: [{ name, value }, ...]
    async updateEntity(tableName, id, updates) {
        const setClause = updates.map(item => `${item.name} = ?`).join(', ');
        const values = [...updates.map(item => item.value), id];
        const sql = `UPDATE ${tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        return await this.d1.prepare(sql).bind(...values).run();
    }

    async deleteById(id, tableName) {
        if (!id) throw new Error('ID is required');
        await this.d1.prepare(`DELETE FROM ${tableName} WHERE id = ?`).bind(id).run();
    }

    async updateDataByDate(tableName, date, updates) {
        const row = await this.d1
            .prepare(`SELECT * FROM ${tableName} WHERE date = ? LIMIT 1`)
            .bind(date)
            .first();
        if (!row) throw new Error('Data not found');
        return await this.updateEntity(tableName, row.id, updates);
    }
}
