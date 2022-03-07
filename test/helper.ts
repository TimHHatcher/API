import { WriteStream } from 'fs';
import { EtlService } from './../src/etlService';
const chai = require('chai')
    , spies = require('chai-spies');
const expect = chai.expect
chai.use(spies);

const fs = require('fs');

describe('Build Helper', () => {

    it('Should successfully build test template', async () => {
        await new Helper().writeTestTemplate(EtlService);
        expect(1).to.equal(1)
    });
})
export class Helper {

    async getAllFuncs<T>(classToCheck: T): Promise<string[]> {
        let obj: any = classToCheck;
        let propertyNames = Object.getOwnPropertyNames(obj.prototype);
        return propertyNames.filter(p => p !== 'constructor');
    }

    async writeTestTemplate<T>(classType: T): Promise<string> {
        try {
            let obj: any = classType;
            const path: string = './test/' + this.lowercaseFirstLetter(obj.name) + '.test.ts'
            if (!fs.existsSync(path)) {
                let methodNames: string[] = await this.getAllFuncs(classType)
                let template: string = await this.buildTemplate(methodNames, obj.name);
                let writeStream: WriteStream = fs.createWriteStream(path, { flags: "w+" });
                writeStream.write(template);
                writeStream.end();
            }
            return 'done';
        } catch (err) {
            console.log(err);
            return 'error';
        }
    }
    async buildTemplate(methodNames: string[], classType: string): Promise<string> {
        let template: string = await this.buildBeginning(classType);
        for (let method of methodNames) {
            template += await this.buildPositiveCase(method);
            template += await this.buildNegativeCase(method);
            template += await this.buildNullCase(method);
        }
        template += await this.buildEnd();
        return template;
    }
    async buildEnd(): Promise<string> {
        return '})';
    }
    async buildBeginning(classType: string): Promise<string> {
        let template: string = `
        import { ` + classType + ` } from './../src/` + this.lowercaseFirstLetter(classType) + `';
        import { ResponseService } from './../src/responseService';
        import { ResponseBody } from './../src/types';
        import { LogContext } from '../src/logger';
        import { Contact } from '../src/generated';
        import { Helper } from './helper';
        const chai = require('chai')
            , spies = require('chai-spies');
        const expect = chai.expect
        chai.use(spies);

        let etlService: EtlService;
        describe('` + classType + ` Service tests', () => {
            beforeEach(async () => {
                chai.spy.restore();
                ` + this.lowercaseFirstLetter(classType) + ` = new ` + classType + `();
                chai.spy.on(console, ['info', 'error', 'debug', 'warn']);
            });
        `;
        return template;

    }

    async buildPositiveCase(methodName: string): Promise<string> {
        let template: string = `
        it('`+ methodName + ` Positive Test Case ', async () => {
        });`;
        return template;
    }

    async buildNegativeCase(methodName: string): Promise<string> {
        let template: string = `
        it('`+ methodName + ` Negative Test Case ', async () => {
        });`;
        return template;
    }

    async buildNullCase(methodName: string): Promise<string> {
        let template: string = `
        it('`+ methodName + ` Null Test Case ', async () => {
        });`;
        return template;
    }

    lowercaseFirstLetter(thing: string) {
        return thing.charAt(0).toLocaleLowerCase() + thing.slice(1);
    }

}
export const handler = async (event: any = {}): Promise<any> => {
    await new Helper().writeTestTemplate(EtlService);
}