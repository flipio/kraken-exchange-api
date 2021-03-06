import {forEach, map} from 'lodash';
import {Trades} from '../account/trades/Trades';
import {Orders} from '../account/orders/Orders';
import {IQueryTrades} from '../account/trades/QueryTrades';
import {ITradesHistory} from '../account/trades/TradesHistory';
import {Util} from '../util/Util';
import {IClientOpts, IKrakenResponse} from '../common/interfaces';

export class Resolver {

    protected Trades: Trades;
    protected Orders: Orders;

    constructor(opts: IClientOpts) {
        this.Trades = new Trades(opts);
        this.Orders = new Orders(opts);
    }

    public queryTradesJoinOrders(opts: IQueryTrades) {
        return new Promise((resolve, reject) => {
            this.Trades
                .query(opts)
                .then((response: IKrakenResponse<any>) => {
                    this.joinOrders(response.result)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    public tradeHistoryJoinOrders(opts: ITradesHistory): Promise<{[key: string]: any}> {
        return new Promise((resolve, reject) => {
            this.Trades
                .getHistory(opts)
                .then((res: IKrakenResponse<any>) => {
                    const trades = res.result.trades;

                    this.joinOrders(trades)
                        .then(resolve)
                        .catch(reject);

                })
                .catch(reject);
        });
    }

    private fetchOrder(oids: string[], opts?): Promise<IKrakenResponse<any>> {
        opts = opts || {};
        return this.Orders.query(Object.assign({}, opts, {
            txid: oids.join(','),
        }));
    }

    private fetchOrders(orderIds: string[], opts: any) {

        const oIds = Util.chunkArray(orderIds, 20);

        const numberOfChunks = oIds.length;

        return new Promise(async (resolve, reject) => {
            let n = 0;
            let result = {};

            while (n < numberOfChunks) {
                let res: IKrakenResponse<any>;

                try {
                    res = await this.fetchOrder(oIds[n], opts);
                } catch (e) {
                    return reject(e);
                }

                result = Object.assign({}, result, res.result);
                n++;
            }

            resolve(result);
        });
    }

    private joinOrders(trades: any) {

        return new Promise((resolve, reject) => {
            const orderIds: string[] = map(trades, (t: any) => {
                return t.ordertxid;
            });

            this.fetchOrders(orderIds, {})
                .then((orders: any) => {

                    const rTrades = {};
                    forEach(trades, (t, tId) => {

                        t.id = tId;
                        rTrades[t.id] = t;

                        forEach(orders, (order: any, oId: string) => {
                            if (oId === t.ordertxid) {
                                order.id = oId;
                                t.order = order;
                            }
                        });

                    });

                    resolve(rTrades);
                }).catch(reject);
        });
    }

}
