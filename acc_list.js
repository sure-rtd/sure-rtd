//データ強制更新ボタン
$("#resetData").click(function() {
  $("#mess").text("Reloding...");
  localStorage.removeItem("rtd_accessory_status_info");
  localStorage.removeItem("rtd_accessory_status_items");
  getAccessoryData();
});

//画面描画後処理
$(document).ready(function() {
  //データ取得＆テーブル生成
  getAccessoryData();
});

/*****************************************************/
//データ取得	getAccessoryData
//WeDataからJSONPで取得し、localstorageに格納する処理。
//処理完了後に後処理として「getAccessoryData_after()」を実行する。
//	[LocalStorage Key]
//		rtd_accessory_status_info : WeData基本情報。更新日等を保持。
//		rtd_accessory_status_items : ユニットステータスデータ本体。
/*****************************************************/
function getAccessoryData() {
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
    chkInfo = localStorage.getItem('rtd_accessory_status_info');
    chkItems = localStorage.getItem('rtd_accessory_status_items');
    if (!chkInfo || !chkItems) {
      flgNeedGetJsonData = true;
    }
  }
  //LSデータ更新確認（JSONP）rtd_accessory_status_info
  var url = 'http://wedata.net/databases/rtd_accessory_lists.json?callback=?';
  chkInfo = JSON.parse(chkInfo);
  $.getJSON(url, function(jsonAccessoryStatusInfo) {
    $("#mess").text("データ更新確認中...");
    if (flgNeedGetJsonData || (chkInfo['updated_at'] !=  jsonAccessoryStatusInfo['updated_at'])) {
      localStorage.setItem('rtd_accessory_status_info', JSON.stringify(jsonAccessoryStatusInfo));
      flgNeedGetJsonData = true;
    }

$("#lastUpdate").text("データ最終更新: " + jsonAccessoryStatusInfo['updated_at']);

    //データ取得が必要な場合
    if (flgNeedGetJsonData) {
      //データ取得（JSONP）
      //取得元：http://wedata.net/databases/rtd_accessory_lists/items
      var url = 'http://wedata.net/databases/rtd_accessory_lists/items.json?callback=?';
      $.getJSON(url, function(jsonAccessoryData) {
        $("#mess").text("データ取得実行中...");
        localStorage.setItem('rtd_accessory_status_items', JSON.stringify(jsonAccessoryData));
        getAccessoryData_after();
      });
    } else {
      getAccessoryData_after();
    }
  });
}

//データ取得後処理関数
function getAccessoryData_after() {
  createTable();
}

/*****************************/
//テーブル生成
/*****************************/
function createTable() {

  $("#mess").text("テーブル生成中...");
  //LSからデータをJSON形式で引出
  var accessorydata = JSON.parse(localStorage.getItem('rtd_accessory_status_items'));

  //データ整理(Noで昇順ソート)
  accessorydata.sort(function(val1, val2) {
    return (Number(val1.data.No) > Number(val2.data.No) ? 1 : -1);
  });

  //tbody初期化
  $('table#accessoryStatusTable tbody *').remove();

	//出力列作成
  for (var key in accessorydata) {
    var workdata = accessorydata[key].data;
		var output = 	"<tr><td class='center'>" + workdata.No + 
									"</td><td class='left'>" + workdata.元ユニット + 
									"</td><td class='left'>" + workdata.名称 +
									"</td><td class='left'>";
									
		if(Math.abs(parseInt(workdata.ライフ)) >= 0){
			output += "体力:" + workdata.ライフ + "<br>";
		}
		if(Math.abs(parseInt(workdata.攻撃力)) >= 0){
			output += "攻撃:" + workdata.攻撃力 + "<br>";
		}
		if(Math.abs(parseInt(workdata.回復)) >= 0){
			output += "回復:" + workdata.回復;
		} 

		//ステータスタグを閉じる
		output += "</td><td class='left'>";

		if(Math.abs(parseInt(workdata.対水)) >= 0){
			output += "対水:" + workdata.対水 + "<br>";
		}
		if(Math.abs(parseInt(workdata.対火)) >= 0){
			output += "対火:" + workdata.対火 + "<br>";
		}
		if(Math.abs(parseInt(workdata.対闇)) >= 0){
			output += "対闇:" + workdata.対闇 + "<br>";
		}
		if(Math.abs(parseInt(workdata.対光)) >= 0){
			output += "対光:" + workdata.対光 + "<br>";
		}
		if(Math.abs(parseInt(workdata.対無)) >= 0){
			output += "対無:" + workdata.対無 + "<br>";
		}
		if(Math.abs(parseInt(workdata.対龍)) >= 0){
			output += "対龍:" + workdata.対龍;
		}

		//特化ダメージタグを閉じて出力を完成させる
		output += "</td><td class='left'>" + workdata.特殊効果 + 
									"</td></tr>";

		$(output).appendTo("table#accessoryStatusTable tbody");
  }

  //テーブル生成後実行関数
  exeAfter();
}

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
}
