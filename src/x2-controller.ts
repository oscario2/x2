import { log } from '../deps.ts';
import { ITest, TAvaliable, TAnyFunction } from './x2-types.ts';

export class X2Controller {
    private readonly tests: Record<TAvaliable, ITest[]>;

    constructor(
        private root: string,
        private describe: TAnyFunction,
        private readonly pkg?: string
    ) {
        this.tests = {} as Record<TAvaliable, ITest[]>;
    }

    /**
     * add to our current suite
     * @param method
     * @param test
     */
    public add(method: TAvaliable, { name, fn }: ITest) {
        const { root, tests } = this; // objects passed by reference
        log.debug(`[${root}]: Add '${name ?? ''}'`);
        if (!tests[method]) tests[method] = [];
        tests[method].push({ name, fn });
    }

    /**
     * run each avaliable hook before or after
     * @param fns
     */
    private async hook(fns: ITest[]) {
        for (const { fn } of fns || []) await fn();
    }

    /**
     * run test suite
     * @param boolean
     */
    public async run(skip?: boolean) {
        if (skip) return;

        // run 'describe'
        await this.describe();

        //
        const { it, beforeAll, beforeEach, afterEach, afterAll } = this.tests;

        // beforeAll
        await this.hook(beforeAll);

        //
        const prefix = this.pkg ? `[${this.pkg}]: ` : '';
        log.info(prefix + this.root);

        for (let i = 0; i < (it || []).length; i++) {
            // beforeEach
            await this.hook(beforeEach);

            const { name, fn } = it[i];
            log.warn(`[${i + 1}/${it.length}]: ${name}`);

            const t0 = performance.now();
            await fn();
            const t1 = (performance.now() - t0).toFixed(1);

            log.success(`[!]: in (${t1}ms)`);

            // afterEach
            await this.hook(afterEach);
        }

        // afterAll
        await this.hook(afterAll);
    }
}
