/* lambda */

var request = require('request');

/* kintone用のパラメータ（<>は要変更） */
var DOMAIN = 'rjl9zaw66wf1.cybozu.com'; //kintone環境のドメイン
var BASE_URL = "https://" + DOMAIN + '/k/v1/';
var headers = {'X-Cybozu-API-Token': process.env.API_KEY};

exports.handler = function(event, context) {
  var body_postrecords = {
    "app": "153",
    "record": {
      "氏名": {
        value: event['queryStringParameters']['name']
      },
      "メールアドレス": {
        value: event['queryStringParameters']['mail']
      },
      "問い合わせ内容": {
        value: event['queryStringParameters']['naiyo']
      },
      "使用している製品": {
        value: event['queryStringParameters']['service'].split(',')
      },
    }
  };
  //kintoneからデータを取得するためのヘッダー情報
  var options_postrecords = {
    url: BASE_URL + 'record.json',
    method: 'POST',
    headers: headers,
    'Content-Type': 'application/json',
    json: body_postrecords
  }
  console.log(options_postrecords);

  try {
    //kintoneのレコードを登録
    request(options_postrecords, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        context.done(null, "登録が完了しました！");
      } else {
        context.done(null, "登録に失敗しました");
      }
    });
  } catch (e) {
    console.log(e);
  }
};