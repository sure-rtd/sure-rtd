//データ強制更新ボタン
$("#resetData").click(function() {
  $("#mess").text("データ再取得実行中...");
  localStorage.removeItem("rtd_unit_status_info");
  localStorage.removeItem("rtd_unit_status_items");
  getUnitData();
});

//画面描画後処理
$(document).ready(function() {
  //データ取得＆テーブル生成
  getUnitData();
});

/*****************************************************/
//データ取得	getUnitData
//WeDataからJSONPで取得し、localstorageに格納する処理。
//処理完了後に後処理として「getUnitData_after()」を実行する。
//	[LocalStorage Key]
//		rtd_unit_status_info : WeData基本情報。更新日等を保持。
//		rtd_unit_status_items : ユニットステータスデータ本体。
/*****************************************************/
function getUnitData() {
  var flgNeedGetJsonData = false;
  var chkInfo;
  var chkItems;
  // ローカルストレージ対応判定
  if (!localStorage) {
    alert('ローカルストレージに対応したブラウザを使用してください。');
    flgNeedGetJsonData = true;
    retrun(false);
  } else {
    //LS存在チェック
    chkInfo = localStorage.getItem('rtd_unit_status_info');
    chkItems = localStorage.getItem('rtd_unit_status_items');
    if (!chkInfo || !chkItems) {
      flgNeedGetJsonData = true;
    }
  }
  //LSデータ更新確認（JSONP）rtd_unit_status_info
  var url = 'http://wedata.net/databases/rtd_unit_status.json?callback=?';
  var chkInfo = JSON.parse(chkInfo);
  $.getJSON(url, function(jsonUnitStatusInfo) {
    $("#mess").text("データ更新確認中...");
    if (flgNeedGetJsonData || (chkInfo['updated_at'] != jsonUnitStatusInfo['updated_at'])) {
      localStorage.setItem('rtd_unit_status_info', JSON.stringify(jsonUnitStatusInfo));
      flgNeedGetJsonData = true;
    }
    $("#lastUpdate").text("データ最終更新: " + jsonUnitStatusInfo['updated_at']);

    //データ取得が必要な場合
    if (flgNeedGetJsonData) {
      //データ取得（JSONP）
      //取得元：http://wedata.net/databases/rtd_unit_status/items
      var url = 'http://wedata.net/databases/rtd_unit_status/items.json?callback=?';
      $.getJSON(url, function(jsonUnitData) {
        $("#mess").text("データ取得実行中...");
        localStorage.setItem('rtd_unit_status_items', JSON.stringify(jsonUnitData));
        getUnitData_after();
      });
    } else {
      getUnitData_after();
    }
  });
};

//データ取得後処理関数
function getUnitData_after() {
  createTable();
}

/*****************************/
//テーブル生成
/*****************************/
function createTable() {

  $("#mess").text("テーブル生成中...");
  //LSからデータをJSON形式で引出
  var unitdata = JSON.parse(localStorage.getItem('rtd_unit_status_items'));

  //データ整理(Noで昇順ソート)
  unitdata.sort(function(val1, val2) {
    return (Number(val1.data.No) > Number(val2.data.No) ? 1 : -1);
  });

  //tbody初期化
  $('table#unitStatusTable tbody *').remove();
  //列作成
  for (var key in unitdata) {
    var workdata = unitdata[key].data;
    var wikiUrl = "http://games.gaym.jp/iPhone/rtd/wiki?" + workdata.名称;

    $("<tr><td>" + workdata.No + "</td><td class='left'><a target='_blank' href=\"" + wikiUrl + "\">" + workdata.名称 + "</a></td><td>" + workdata["★"] + "</td><td>" + workdata.武器 + "</td><td>" + workdata.主属性 + "</td><td>" + workdata.副属性 + "</td><td>" + workdata.HP + "</td><td>" + workdata.攻撃 + "</td><td>" + workdata.回復 + "</td></tr>").appendTo("table#unitStatusTable tbody");

  }

  //テーブル生成後実行関数
  exeAfter();
};

/*****************************/
//テーブル生成後実行関数
/*****************************/
function exeAfter() {
  //メッセージクリア
  $("#mess").text("");

  //TODO
  //ソート処理

  //フィルタ関数
  setFilter();
  $('.filter').multifilter();

}

/*****************************/
//フィルタ関数
/*****************************/
function setFilter() {
  $.fn.multifilter = function(options) {
    var settings = $.extend({
      'target': $('table')
    }, options);

    jQuery.expr[":"].Contains = function(a, i, m) {
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    this.each(function() {
      var $this = $(this);
      container = settings.target;
      row_tag = 'tr';
      item_tag = 'td';
      rows = container.find($('tbody ' + row_tag));

      var col = container.find('th:Contains(' + $this.attr('name') + ')');
      var col_index = container.find($('thead th')).index(col);
      $this.change(function() {
        input = $this;
        filter = $this.val();
        rows.each(function() {
          hidden_rows = [];
          visible_rows = [];
          row = $(this);
          cell = $(row.children(item_tag)[col_index]);
          if (filter) {
            if (cell.text().toLowerCase().indexOf(filter.toLowerCase()) != -1) {
              cell.attr('data-filtered', 'positive');
            } else {
              cell.attr('data-filtered', 'negative');
            }
            if (row.find(item_tag + "[data-filtered=negative]").length > 0) {
              row.hide();
            } else {
              if (row.find(item_tag + "[data-filtered=positive]").length > 0) {
                row.show();
              }
            }
          } else {
            cell.attr('data-filtered', 'positive');
            if (row.find(item_tag + "[data-filtered=negative]").length > 0) {
              row.hide();
            } else {
              if (row.find(item_tag + "[data-filtered=positive]").length > 0) {
                row.show();
              }
            }
          }
        });
        return false;
      }).keyup(function() {
        $this.change();
      });
    });
  };
};