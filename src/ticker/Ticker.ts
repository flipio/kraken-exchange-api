import {forEach} from 'lodash';
import {KrakenEndoints} from '../clients';
import {TickerInfo} from './TickerInfo';
import {Client} from '../util/DefaultClient';
import {IClientOpts, IKrakenResponse} from '../common/interfaces';

const MODULE_NAME = '[Kraken:Ticker]';
const endpointPath = KrakenEndoints.Ticker;

function createTickerCollection(rawResponse): TickerInfo[] {

    const collection: TickerInfo[] = [];

    forEach(rawResponse, (rawTickerData, tickerPair) => {
        collection.push(new TickerInfo(rawTickerData, tickerPair));
    });

    return collection;
}

export class Ticker extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    getPairsTickers(assetPairs, callback): Promise<TickerInfo[]> {
        const message: any = {};

        if (assetPairs !== null) {
            if (!(assetPairs instanceof Array) || assetPairs.length === 0) {
                throw new Error(MODULE_NAME + 'Kraken:Assets: `assetPairs` for non-null values need to be an array');
            }

            assetPairs.forEach((assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error(MODULE_NAME + ' every `assetPair` in array need to be a non-empty string');
                }
            });

            message.pair = assetPairs.join(',');
        }

        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath, message);

            request
                .then((body: IKrakenResponse<any>) => {
                    const tickerCollection: TickerInfo[] = createTickerCollection(body.result);
                    resolve(tickerCollection);
                }).catch(reject);

        }).then((response: TickerInfo[]) => {

            if (typeof callback === 'function') {
                callback(response);
            }

            return response;
        });
    }

    getSinglePairTicker(assetPair, callback): Promise<TickerInfo> {

        if (typeof assetPair !== 'string' || !assetPair) {
            throw new Error(MODULE_NAME + ' `assetPair` variable need to be a non-empty string');
        }

        return this.getPairsTickers([assetPair], callback)
            .then(collection => collection[0]);
    }

}
