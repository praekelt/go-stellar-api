var nock = require('nock'),
    fixtureSet = require('./fixture-set');


// requiring nock causes it to disallow all network connections,
// we don't want that
nock.enableNetConnect();


module.exports = fixtureSet({
  setup: function(fixtures) {
    fixtures
      .add('stellarApi:url', 'https://test.stellar.org:9002')

      .add('stellarApi:issuer', 'gBAde4mkDijZatAdNhBzCsuC7GP4MzhA3B')

      .add('stellarApi:payment:str', nock(fixtures('stellarApi:url'))
        .post('/', {"method":"submit","params":[{"secret":"sfSU4rF2UuKTCQG5kTukEqNsuUgUTgf2UuC2gsEokxtypwCeJbZ","tx_json":{"TransactionType":"Payment","Account":"gajc65uAsK4AgQM771SqkntWyVQL48GBjK","Destination":"gLk2FP9PFw1TFAt7kyAVuJpr4vLapiVRSJ","Amount":1}}]})
        .reply(200, {"result":{"engine_result":"tesSUCCESS","engine_result_code":0,"engine_result_message":"The transaction was applied.","status":"success","tx_blob":"1200002280000000240000000461400000000000000168400000000000000A7320B7569D0CB9640CF8019A791A85E7471288D649C57E255FE9C4680561196F3CC674401CDFBF702698B937115854992335C5161409A82AEC371CAF87E0AF35D7FC82A6564F04483B4BC1C6961FCAF992C2330ACF70F45CC8976384182856DE5717E90881143EE7E6E56C87D5337CE550F60684B849E5E9BCE18314D8A88154ADAC1A2AF7EC34F50AB62D8926307841","tx_json":{"Account":"gajc65uAsK4AgQM771SqkntWyVQL48GBjK","Amount":"1","Destination":"gLk2FP9PFw1TFAt7kyAVuJpr4vLapiVRSJ","Fee":"10","Flags":2147483648,"Sequence":4,"SigningPubKey":"B7569D0CB9640CF8019A791A85E7471288D649C57E255FE9C4680561196F3CC6","TransactionType":"Payment","TxnSignature":"1CDFBF702698B937115854992335C5161409A82AEC371CAF87E0AF35D7FC82A6564F04483B4BC1C6961FCAF992C2330ACF70F45CC8976384182856DE5717E908","hash":"CB597A37A0EC5EFB2FA89D525FD3C071586524487CB4896CCA50205F2BC3CB16"}}}, {date: 'Fri, 10 Apr 2015 07:46:14 +0000', connection: 'Keep-Alive', 'access-control-allow-origin': '*', 'content-length': '1193', 'content-type': 'application/json; charset=UTF-8', server: 'stellar-json-rpc/Stellar-0.28.0 (a81c11d)'}))

    .add('stellarApi:payment:usd', nock(fixtures('stellarApi:url'))
      .post('/', {"method":"submit","params":[{"secret":"sfSU4rF2UuKTCQG5kTukEqNsuUgUTgf2UuC2gsEokxtypwCeJbZ","tx_json":{"TransactionType":"Payment","Account":"gajc65uAsK4AgQM771SqkntWyVQL48GBjK","Destination":"gLk2FP9PFw1TFAt7kyAVuJpr4vLapiVRSJ","Amount":{"value":1,"currency":"USD","issuer":"gBAde4mkDijZatAdNhBzCsuC7GP4MzhA3B"}}}]})
      .reply(200, {"result":{"engine_result":"tesSUCCESS","engine_result_code":0,"engine_result_message":"The transaction was applied.","status":"success","tx_blob":"1200002280000000240000001561D4838D7EA4C68000000000000000000000000000555344000000000078064F19696F4ADD2438E27070E5EA51B4DD233668400000000000000A7320B7569D0CB9640CF8019A791A85E7471288D649C57E255FE9C4680561196F3CC67440159FC4CCA144C69201B09DAFF0A974AD746F8B8AF14804F532B4248A1988A37C8536FC1B915B6F3F61B5E3FAB44AEAA217871A4EEEB5A3DE87916BE7F18BD80A81143EE7E6E56C87D5337CE550F60684B849E5E9BCE18314D8A88154ADAC1A2AF7EC34F50AB62D8926307841","tx_json":{"Account":"gajc65uAsK4AgQM771SqkntWyVQL48GBjK","Amount":{"currency":"USD","issuer":"gBAde4mkDijZatAdNhBzCsuC7GP4MzhA3B","value":"1"},"Destination":"gLk2FP9PFw1TFAt7kyAVuJpr4vLapiVRSJ","Fee":"10","Flags":2147483648,"Sequence":21,"SigningPubKey":"B7569D0CB9640CF8019A791A85E7471288D649C57E255FE9C4680561196F3CC6","TransactionType":"Payment","TxnSignature":"159FC4CCA144C69201B09DAFF0A974AD746F8B8AF14804F532B4248A1988A37C8536FC1B915B6F3F61B5E3FAB44AEAA217871A4EEEB5A3DE87916BE7F18BD80A","hash":"DBC85894E0E0EC22C523717533E5632C83F4DA2212E38F09FF447406BC488F4C"}}}, {date: 'Fri, 10 Apr 2015 10:53:05 +0000', connection: 'Keep-Alive', 'access-control-allow-origin': '*', 'content-length': '1402', 'content-type': 'application/json; charset=UTF-8', server: 'stellar-json-rpc/Stellar-0.28.0 (a81c11d)'}));
  },
  teardown: function(fixtures) {
    nock.cleanAll();
  }
});
