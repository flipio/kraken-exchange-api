import {AuthChecker} from '../../Common/AuthChecker';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {AuthorizedClient, IOtp} from '../../Clients/AuthorizedClient';
import {forEach} from 'lodash';

const MODULE_NAME = '[Trades:Volume]';

export interface ITradeVolume extends IOtp {
    pair: string[] | string;
}

export class TradeVolume {

    client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    /**
     * opts.pair = Array<string> or comma delimited list of asset pairs to get fee info on (optional)
     * opts.fee-info = whether or not to include fee info in results (optional)
     *
     * @param opts
     * @returns {Promise}
     */
    get(opts: ITradeVolume) {

        if (opts && opts.pair && Array.isArray(opts.pair)) {
            let assetPairs: any = opts.pair;

            forEach(assetPairs, (assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error(MODULE_NAME + ' Every `assetPair` in array need to be a non-empty string')
                }
            });

            opts.pair = assetPairs.join(',')
        }

        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.TradeVolume, opts)
                .then(resolve) //TODO: parse results first
                .catch(reject);

        });
    }
}

