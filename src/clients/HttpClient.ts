import * as request from 'request-promise';
import * as qs from 'querystring';

import {Config} from '../config';
import {Retry} from '../util/Retry';
import {MessageSignature} from './MessageSignature';
import {Util} from '../util/Util';
import {AuthChecker} from '../util/AuthChecker';
import {IAuthOpts, IKrakenResponse} from '../common/interfaces';
import {Logger} from '../util/logger';

const Conf = Config.config;
const KRAKEN_API_ENDPOINT_URL = Conf.KRAKEN_API_ENDPOINT;
const MODULE_NAME = 'Kraken:HttpClient';

export interface IHttpClientOpts {
    retryCount?: number;
    retryDelay?: number;
}

const NoAuthDefault: IAuthOpts = {
    apiKey: '',
    apiSecret: '',
};

export class HttpClient {

    protected MessageSignature: MessageSignature;

    private auth: IAuthOpts;
    private logger: Logger;

    private retryCount: number;
    private retryDelay: number;

    /**
     * AuthOpts are required but u can default to empty strings so client wont send auth headers
     *
     * @param {IAuthOpts} authOpts
     * @param {IHttpClientOpts} opts
     */
    constructor(authOpts?: IAuthOpts, opts?: IHttpClientOpts) {
        authOpts = authOpts ? authOpts : Object.assign({}, NoAuthDefault);
        opts = opts || {};

        if (opts.retryCount) {
            this.retryCount = opts.retryCount;
        }

        if (opts.retryDelay) {
            this.retryDelay = opts.retryDelay;
        }

        this.logger = new Logger(MODULE_NAME);

        this.configureAuth(authOpts);
    }

    public updateAuth(auth: IAuthOpts) {
        this.configureAuth(auth);
    }

    public post(path: string, data?): Promise<any> {
        return this.requestRetry('POST', path, data);
    }

    public get(path: string, data?): Promise<any> {
        return this.requestRetry('GET', path, data);
    }

    public put(path: string, data?): Promise<any> {
        return this.requestRetry('PUT', path, data);
    }

    public delete(path: string, data?): Promise<any> {
        return this.requestRetry('DELETE', path, data);
    }

    private configureAuth(auth: IAuthOpts): void {

        if (Util.validateAuth(auth)) {

            const AuthCheck = new AuthChecker(auth);
            AuthCheck.validateAuth();

            this.MessageSignature = new MessageSignature();
            this.auth = auth;
            this.MessageSignature.setSecret(this.auth.apiSecret);
        } else {
            this.logger.debug('Auth configuration not passed, proceed.');
        }

    }

    private requestRetry(...args): Promise<any> {
        const resource = new Retry(this._request.bind(this));

        if (this.retryDelay) {
            resource.setRetryDelay(this.retryDelay);
        }

        if (this.retryCount) {
            resource.setRetryCount(this.retryCount);
        }

        return resource.request(...args);
    }

    private _request(method: string, path: string, message: any): Promise<any> {

        /**
         * Need message to be empty object as default so extending will work
         * @type {*|{}}
         */
        message = message || {};

        const nonce = this.getNonce();

        const url = KRAKEN_API_ENDPOINT_URL + path;

        let headers = {
            'User-Agent': 'Kraken Javascript API Client',
        };

        /**
         * OTP will be set during the call in payload which will extend this object
         * @type {{nonce: number}}
         */
        let data = Object.assign({}, message);

        /**
         * If auth present do the magic
         * Only POST requests require auth so filter with that in mind
         * !== 'get' if they implement put/patch/delete actions
         */
        if (method.toLowerCase() !== 'get' && this.auth && Util.validateAuth(this.auth)) {

            const authData = {
                nonce,
            };

            this.logger.debug('Auth present, attaching auth headers for post requests.');
            const _messageSignature = this.MessageSignature.getSignature(path, data, nonce);

            headers = Object.assign({}, headers, {
                'API-Key': this.auth.apiKey,
                'API-Sign': _messageSignature,
            });

            data = Object.assign(data, authData);
        }

        const options: any = {
            headers,
            method: method.toUpperCase(),
            resolveWithFullResponse: true,
            uri: url,
        };

        if (method.toLowerCase() === 'get') {
            options.qs = data;
        } else {
            options.body = qs.stringify(data);
        }

        return new Promise((resolve, reject) => {
            this.logger.debug('Sending request to kraken: ', options);

            request(options)
                .then((response) => {

                    this.logger.debug('Server responsed with status: ' + response.statusCode);

                    let body: IKrakenResponse<any>;

                    try {
                        body = JSON.parse(response.body);
                    } catch (e) {
                        this.logger.info('Failed to parse kraken response body - Invalid json.');
                        throw new Error('Cannot parse Kraken data response.');
                    }

                    if (body.error ) {
                        const krakenErrors = Util.extractKrakenErrors(body.error);

                        if (krakenErrors.length > 0) {
                            this.logger.debug('Kraken errors detected, rejecting: ', krakenErrors);
                            return reject(body.error);
                        }

                    }

                    return resolve(body);

                })
                .catch(e => reject(e));
        });

    }

    private getNonce(): number {
        const time = new Date() as any;
        return time * 1000;
    }

}
