import {Client} from '../../Util/DefaultClient';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {IClientOpts, IOtp} from '../../common/interfaces';

export interface IOrderCancel extends IOtp {
    txid: string; // transaction id
}

export class CancelOrder extends Client {

    constructor(opts: IClientOpts, client?) {
        super(opts, client);
    }

    cancel(opts: IOrderCancel) {
        return new Promise((resolve, reject) => {
            this.client
                .post(KrakenEndoints.CancelOrder, opts)
                .then(resolve)
                .catch(reject);
        })
    }

}