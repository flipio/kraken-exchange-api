const nock = require('nock');
const krakenEndpoints = require('../../lib/Clients/KrakenEndpoints')
const KRAKEN_API_ENDPOINT_URL = 'https://api.kraken.com'

const timeResponseBody = {
  error: [],
  result: {
    unixtime: Math.floor(new Date() / 1000),
    rfc1123: "Sat, 10 Jun 17 19:43:58 +0000"
  }
}

const nockTime = nock(KRAKEN_API_ENDPOINT_URL)
  .get(krakenEndpoints.Time)
  .reply(200, timeResponseBody)


const assetsResponses = {
  all: {"error":[],"result":{"DASH":{"aclass":"currency","altname":"DASH","decimals":10,"display_decimals":5},"GNO":{"aclass":"currency","altname":"GNO","decimals":10,"display_decimals":5},"KFEE":{"aclass":"currency","altname":"FEE","decimals":2,"display_decimals":2},"USDT":{"aclass":"currency","altname":"USDT","decimals":8,"display_decimals":4},"XDAO":{"aclass":"currency","altname":"DAO","decimals":10,"display_decimals":3},"XETC":{"aclass":"currency","altname":"ETC","decimals":10,"display_decimals":5},"XETH":{"aclass":"currency","altname":"ETH","decimals":10,"display_decimals":5},"XICN":{"aclass":"currency","altname":"ICN","decimals":10,"display_decimals":5},"XLTC":{"aclass":"currency","altname":"LTC","decimals":10,"display_decimals":5},"XMLN":{"aclass":"currency","altname":"MLN","decimals":10,"display_decimals":5},"XNMC":{"aclass":"currency","altname":"NMC","decimals":10,"display_decimals":5},"XREP":{"aclass":"currency","altname":"REP","decimals":10,"display_decimals":5},"XXBT":{"aclass":"currency","altname":"XBT","decimals":10,"display_decimals":5},"XXDG":{"aclass":"currency","altname":"XDG","decimals":8,"display_decimals":2},"XXLM":{"aclass":"currency","altname":"XLM","decimals":8,"display_decimals":5},"XXMR":{"aclass":"currency","altname":"XMR","decimals":10,"display_decimals":5},"XXRP":{"aclass":"currency","altname":"XRP","decimals":8,"display_decimals":5},"XXVN":{"aclass":"currency","altname":"XVN","decimals":4,"display_decimals":2},"XZEC":{"aclass":"currency","altname":"ZEC","decimals":10,"display_decimals":5},"ZCAD":{"aclass":"currency","altname":"CAD","decimals":4,"display_decimals":2},"ZEUR":{"aclass":"currency","altname":"EUR","decimals":4,"display_decimals":2},"ZGBP":{"aclass":"currency","altname":"GBP","decimals":4,"display_decimals":2},"ZJPY":{"aclass":"currency","altname":"JPY","decimals":2,"display_decimals":0},"ZKRW":{"aclass":"currency","altname":"KRW","decimals":2,"display_decimals":0},"ZUSD":{"aclass":"currency","altname":"USD","decimals":4,"display_decimals":2}}} ,
  few: {"error":[],"result":{"XETH":{"aclass":"currency","altname":"ETH","decimals":10,"display_decimals":5},"XXBT":{"aclass":"currency","altname":"XBT","decimals":10,"display_decimals":5}}},
  single: {"error":[],"result":{"XXBT":{"aclass":"currency","altname":"XBT","decimals":10,"display_decimals":5}}}
}

const nockAssets =   nock(KRAKEN_API_ENDPOINT_URL)
  .get(krakenEndpoints.Assets)
  .reply(200, assetsResponses.all)
  .get(krakenEndpoints.Assets + "?asset=XBT%2CETH")
  .reply(200, assetsResponses.few)
  .get(krakenEndpoints.Assets + "?asset=XBT")
  .reply(200, assetsResponses.single)


const allAssetPairsResponseBody =
  {"error":[],"result":{"DASHEUR":{"altname":"DASHEUR","aclass_base":"currency","base":"DASH","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"DASHUSD":{"altname":"DASHUSD","aclass_base":"currency","base":"DASH","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"DASHXBT":{"altname":"DASHXBT","aclass_base":"currency","base":"DASH","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"GNOETH":{"altname":"GNOETH","aclass_base":"currency","base":"GNO","aclass_quote":"currency","quote":"XETH","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"GNOEUR":{"altname":"GNOEUR","aclass_base":"currency","base":"GNO","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"GNOUSD":{"altname":"GNOUSD","aclass_base":"currency","base":"GNO","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"GNOXBT":{"altname":"GNOXBT","aclass_base":"currency","base":"GNO","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"USDTZUSD":{"altname":"USDTUSD","aclass_base":"currency","base":"USDT","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":4,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.2],[50000,0.16],[100000,0.12],[250000,0.08],[500000,0.04],[1000000,0]],"fees_maker":[[0,0.2],[50000,0.16],[100000,0.12],[250000,0.08],[500000,0.04],[1000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETCXETH":{"altname":"ETCETH","aclass_base":"currency","base":"XETC","aclass_quote":"currency","quote":"XETH","lot":"unit","pair_decimals":8,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETCXXBT":{"altname":"ETCXBT","aclass_base":"currency","base":"XETC","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":8,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3],"leverage_sell":[2,3],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETCZEUR":{"altname":"ETCEUR","aclass_base":"currency","base":"XETC","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETCZUSD":{"altname":"ETCUSD","aclass_base":"currency","base":"XETC","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHXXBT":{"altname":"ETHXBT","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHXXBT.d":{"altname":"ETHXBT.d","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZCAD":{"altname":"ETHCAD","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZCAD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZCAD.d":{"altname":"ETHCAD.d","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZCAD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZEUR":{"altname":"ETHEUR","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZEUR.d":{"altname":"ETHEUR.d","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZGBP":{"altname":"ETHGBP","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZGBP","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZGBP.d":{"altname":"ETHGBP.d","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZGBP","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZJPY":{"altname":"ETHJPY","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZJPY","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZJPY.d":{"altname":"ETHJPY.d","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZJPY","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZUSD":{"altname":"ETHUSD","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XETHZUSD.d":{"altname":"ETHUSD.d","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XICNXETH":{"altname":"ICNETH","aclass_base":"currency","base":"XICN","aclass_quote":"currency","quote":"XETH","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XICNXXBT":{"altname":"ICNXBT","aclass_base":"currency","base":"XICN","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XLTCXXBT":{"altname":"LTCXBT","aclass_base":"currency","base":"XLTC","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XLTCZEUR":{"altname":"LTCEUR","aclass_base":"currency","base":"XLTC","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XLTCZUSD":{"altname":"LTCUSD","aclass_base":"currency","base":"XLTC","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XMLNXETH":{"altname":"MLNETH","aclass_base":"currency","base":"XMLN","aclass_quote":"currency","quote":"XETH","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XMLNXXBT":{"altname":"MLNXBT","aclass_base":"currency","base":"XMLN","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XREPXETH":{"altname":"REPETH","aclass_base":"currency","base":"XREP","aclass_quote":"currency","quote":"XETH","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XREPXXBT":{"altname":"REPXBT","aclass_base":"currency","base":"XREP","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XREPZEUR":{"altname":"REPEUR","aclass_base":"currency","base":"XREP","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XREPZUSD":{"altname":"REPUSD","aclass_base":"currency","base":"XREP","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZCAD":{"altname":"XBTCAD","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZCAD","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZCAD.d":{"altname":"XBTCAD.d","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZCAD","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZEUR":{"altname":"XBTEUR","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZEUR.d":{"altname":"XBTEUR.d","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZGBP":{"altname":"XBTGBP","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZGBP","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZGBP.d":{"altname":"XBTGBP.d","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZGBP","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZJPY":{"altname":"XBTJPY","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZJPY","lot":"unit","pair_decimals":1,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZJPY.d":{"altname":"XBTJPY.d","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZJPY","lot":"unit","pair_decimals":1,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZUSD":{"altname":"XBTUSD","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZUSD.d":{"altname":"XBTUSD.d","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.36],[50000,0.34],[100000,0.32],[250000,0.3],[500000,0.28],[1000000,0.26],[2500000,0.24],[5000000,0.22],[10000000,0.2]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXDGXXBT":{"altname":"XDGXBT","aclass_base":"currency","base":"XXDG","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":8,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXLMXXBT":{"altname":"XLMXBT","aclass_base":"currency","base":"XXLM","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":8,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXLMZEUR":{"altname":"XLMEUR","aclass_base":"currency","base":"XXLM","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXLMZUSD":{"altname":"XLMUSD","aclass_base":"currency","base":"XXLM","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXMRXXBT":{"altname":"XMRXBT","aclass_base":"currency","base":"XXMR","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3],"leverage_sell":[2,3],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXMRZEUR":{"altname":"XMREUR","aclass_base":"currency","base":"XXMR","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXMRZUSD":{"altname":"XMRUSD","aclass_base":"currency","base":"XXMR","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2],"leverage_sell":[2],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXRPXXBT":{"altname":"XRPXBT","aclass_base":"currency","base":"XXRP","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":8,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXRPZCAD":{"altname":"XRPCAD","aclass_base":"currency","base":"XXRP","aclass_quote":"currency","quote":"ZCAD","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXRPZEUR":{"altname":"XRPEUR","aclass_base":"currency","base":"XXRP","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXRPZJPY":{"altname":"XRPJPY","aclass_base":"currency","base":"XXRP","aclass_quote":"currency","quote":"ZJPY","lot":"unit","pair_decimals":4,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXRPZUSD":{"altname":"XRPUSD","aclass_base":"currency","base":"XXRP","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XZECXXBT":{"altname":"ZECXBT","aclass_base":"currency","base":"XZEC","aclass_quote":"currency","quote":"XXBT","lot":"unit","pair_decimals":6,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XZECZEUR":{"altname":"ZECEUR","aclass_base":"currency","base":"XZEC","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XZECZUSD":{"altname":"ZECUSD","aclass_base":"currency","base":"XZEC","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[],"leverage_sell":[],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40}}}

const fewAssetPairsResponseBody =
  {"error":[],"result":{"XETHZEUR":{"altname":"ETHEUR","aclass_base":"currency","base":"XETH","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":5,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZEUR":{"altname":"XBTEUR","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40},"XXBTZUSD":{"altname":"XBTUSD","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZUSD","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40}}}

const singleAssetPairResponseBody =
  {"error":[],"result":{"XXBTZEUR":{"altname":"XBTEUR","aclass_base":"currency","base":"XXBT","aclass_quote":"currency","quote":"ZEUR","lot":"unit","pair_decimals":3,"lot_decimals":8,"lot_multiplier":1,"leverage_buy":[2,3,4,5],"leverage_sell":[2,3,4,5],"fees":[[0,0.26],[50000,0.24],[100000,0.22],[250000,0.2],[500000,0.18],[1000000,0.16],[2500000,0.14],[5000000,0.12],[10000000,0.1]],"fees_maker":[[0,0.16],[50000,0.14],[100000,0.12],[250000,0.1],[500000,0.08],[1000000,0.06],[2500000,0.04],[5000000,0.02],[10000000,0]],"fee_volume_currency":"ZUSD","margin_call":80,"margin_stop":40}}}

const nockAssetPairs = nock(KRAKEN_API_ENDPOINT_URL)
  .get(krakenEndpoints.AssetPairs)
  .reply(200, allAssetPairsResponseBody)
  .get(krakenEndpoints.AssetPairs + "?pair=XBTEUR%2CXBTUSD%2CETHEUR")
  .reply(200, fewAssetPairsResponseBody)
  .get(krakenEndpoints.AssetPairs + "?pair=XBTEUR")
  .reply(200, singleAssetPairResponseBody)
