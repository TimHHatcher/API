import { IMain, ParameterizedQuery } from 'pg-promise';
import pgPromise from "pg-promise";
import { LogContext, logError, logInfo, ApiEvent } from './logger';

export class DatabaseRepository {

    public pgp: IMain;
    public db: any;
    private PQ: any;

    insertSql = ``;
    getSql = ``;
    initialize() {
        try {
            this.pgp = pgPromise();
            this.PQ = pgPromise().ParameterizedQuery;
            this.db = this.pgp({
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                ssl: {
                    rejectUnauthorized: false
                },
                application_name: 'api-cypress'
            });
        } catch (error) {
            throw error;
        }
    }

    async getExample(input: any): Promise<any> {
        let query: any = new this.PQ(this.getSql);
        query.values = [JSON.stringify(input)];
        let response: any = await this.db.any(query);
        return response[0];
    }

    async insertExample(input: any) {
        try {
            let query: any = new this.PQ(this.insertExample);
            query.values = [JSON.stringify(input)];
            await this.db.any(query);
        } catch (err) {
            logError('Error inserting', null, JSON.stringify(err));
        }
    }

    async closeConnection() {
        try {
            if (this.pgp) {
                this.pgp.end();
            }
        } catch (error) {
            logError(error.message, null, error);
        }
    }
}