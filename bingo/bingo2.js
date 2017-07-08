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
'bingo/01.png"',
'bingo/03.png"',
'bingo/04.png"',
'bingo/05.png"',
'bingo/06.png"',
'bingo/07.png"',
'bingo/08.png"',
'bingo/09.png"',
'bingo/10.png"',
'bingo/11.png"',
'bingo/12.png"',
'bingo/13.png"',
'bingo/14.png"',
'bingo/15.png"',
'bingo/16.png"',
'bingo/17.png"',
'bingo/18.png"',
'bingo/19.png"',
'bingo/20.png"',
'bingo/21.png"',
'bingo/22.png"',
'bingo/23.png"',
'bingo/24.png"',
'bingo/25.png"',
'bingo/26.png"',
'bingo/27.png"',
'bingo/28.png"',
'bingo/29.png"',
'bingo/30.png"',
'bingo/31.png"',
'bingo/32.png"',
'bingo/33.png"'
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
