import {AuthChecker} from '../../Common/AuthChecker';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {AuthorizedClient, IOtp} from '../../Clients/AuthorizedClient';

export interface IBalance {
    eb: string,
    tb: string,
    m: string,
    n: string,
    c: string,
    v: string,
    e: string,
    mf: string,
    ml: string
}

export class BalanceInfo {

    protected _balance: IBalance;

    constructor(balance: IBalance) {
        this._balance = balance;
    }

    getRawData() {
        return this._balance;
    }

    getEquivalentBalance() {
        return this._balance.eb;
    }

    getTradeBalance() {
        return this._balance.tb;
    }

    getMarginAmount() {
        return this._balance.m;
    }

    getUnrealizedNetProfit() {
        return this._balance.n;
    }

    getCostBasis() {
        return this._balance.c;
    }

    getCurrentValuation() {
        return this._balance.v;
    }

    getEquity() {
        return this._balance.e;
    }

    getFreeMargin() {
        return this._balance.mf;
    }

    getMarginLevel() {
        return this._balance.ml;
    }

}

export interface ITradeBalance extends IOtp {
    aclass?: string; //asset class default 'currency'
    asset?: string; // base asset used to determine balance (default = ZUSD)
}

export class TradeBalance {

    protected client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    get(opts: ITradeBalance, raw: boolean): Promise<BalanceInfo | any> {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.TradeBalance, opts)
                .then((d: IBalance) => {
                    resolve(raw ? d : new BalanceInfo(d));
                })
                .catch(reject);

        });
    }
}
