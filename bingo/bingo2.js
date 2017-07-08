/*****************************************************/
//共通変数設定
/*****************************************************/
var slotTime = null;
var result = [];
var slotNumber = 0;
var nMax = 31;
var nMin = 0;
var statusFlg = 'stop';

var units = [
'アネモネ',
'ナタル',
'ヴェルベット(悪滅王)',
'シャム',
'A(永誓王)',
'A(DG)',
'ゼロシキ',
'オリヴァー',
'まゆ',
'アルス',
'クロノ',
'ディアブロ',
'ドラコ',
'ゾエア',
'ナタル(17Y)',
'フリージア',
'グリムドア',
'ディオーネ',
'ディオーネ(17Y)',
'アリス',
'ヴェル',
'ファルニラ',
'ヴィルト',
'HOJ-021D',
'ヴァルザーク(覚醒)',
'マーガレット',
'YORI-Mk3',
'ヴァルザーク',
'キルマ(の人形)',
'シグムント',
'リーヴァ',
'ドーラ'
];

var imgUrl = [
'01.png',
'03.png',
'04.png',
'05.png',
'06.png',
'07.png',
'08.png',
'09.png',
'10.png',
'11.png',
'12.png',
'13.png',
'14.png',
'15.png',
'16.png',
'17.png',
'18.png',
'19.png',
'20.png',
'21.png',
'22.png',
'23.png',
'24.png',
'25.png',
'26.png',
'27.png',
'28.png',
'29.png',
'30.png',
'31.png',
'32.png',
'33.png"'
];

/*****************************************************/
//スロット開始：STARTボタンを押すと作動
/*****************************************************/
function start() {
	var startButton = document.getElementById('start');
	var displayArea = document.getElementById('display');
	var imageArea = document.getElementById('image');
	var resultArea = document.getElementById('result');
	if(statusFlg==='stop'){
        
        //ステータスを開始状態に
		statusFlg = 'start';
		// HTMLImageElement オブジェクトを作成する
		var image = new Image();
    if (slotTime) {
        clearInterval(slotTime);
    }
		//ランダムな整数を発生してタイマー秒間隔で無限にループ
    slotTime = setInterval(function () {
			slotNumber = Math.floor(Math.random()*(nMax-nMin+1))+nMin;
      displayArea.value = units[slotNumber];
    }, 10);
    //ボタンの表示をSTOPに変更
    startButton.value = 'STOP';
	}
  
/*****************************************************/
//スロット停止：STOPボタンを押すと作動
/*****************************************************/
    else if(statusFlg==='start'){
    //画像を表示
    imageArea.src = imgUrl[slotNumber];
		
    if (slotTime) {
	  	clearInterval(slotTime);
    	slotTime = null;
  	}

    //ステータスを停止状態に
	statusFlg = 'stop';		
  
    //resultエリアを加工して出力
		result.push(units[slotNumber]);
  	var resultText = '';
  	var i = 1;
  	for (var key in result) {
  		resultText += i + ': ' + result[key] + '\n';
        i +=1;
    }
      
  	resultArea.value = resultText;
	
  	//出現したキャラは配列から削除
		units.splice(slotNumber,1);
		imgUrl.splice(slotNumber,1);
		nMax -= 1;
    //ボタンの表示をSTARTに変更
    startButton.value = 'START';
	}
}

/*****************************************************/
//スロットリセット：RESETボタンを押すと作動し、ページをリロード
/*****************************************************/
function reset() {
	var resetButton = document.getElementById('reset');
	location.reload();
}
