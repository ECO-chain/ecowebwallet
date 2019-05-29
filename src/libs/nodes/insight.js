import axios from 'axios'
import config from 'libs/config'

let domain = ''
switch (config.getNetwork()) {
  case 'testnet':
    domain = 'http://testnet.api.ecoc.io'
    break
  case 'mainnet':
    domain = 'http://testnet.api.ecoc.io'
    break
}
const apiPrefix = domain + ''

const _get = async url => {
  return (await axios.get(apiPrefix + url)).data
}

const _post = async (url, data) => {
  return (await axios.post(apiPrefix + url, data)).data
}

export default {
  async getInfo(address) {
    return await _get(`/addr/${address}`)
  },

  async getEcrc20(address) {
    return await _get(`/ecrc20/balances?balanceAddress=${address}`)
  },

  async getTokenInfo(contractAddress) {
    return await _get(`/ecrc20/${contractAddress}`)
  },

  async getTxList(address) {
    return await _get(`/txs/?address=${address}`)
  },

  async getUtxoList(address) {
    return (await _get(`/addr/${address}/utxo`)).map(item => {
      return {
        address: item.address,
        txid: item.txid,
        confirmations: item.confirmations,
        isStake: item.isStake,
        amount: item.amount,
        satoshis: item.satoshis,
        vout: item.vout,
        hash: item.txid
      }
    })
  },

  async sendRawTx(rawTx) {
    return (await (_post('/tx/send', { rawtx: rawTx }))).txid
  },

  async fetchRawTx(txid) {
    return (await _get(`/rawtx/${txid}`)).rawtx
  },

  getTxExplorerUrl(tx) {
    return `${domain}/tx/${tx}`
  },

  getAddrExplorerUrl(addr) {
    return `${domain}/address/${addr}`
  },

  async callContract(address, encodedData) {
    return (await _get(`/contracts/${address}/hash/${encodedData}/call`))['executionResult']['output']
  }
}
