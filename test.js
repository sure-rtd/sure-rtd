var startButton = document.getElementById('start');
var displayArea = document.getElementById('display');
var slotTime = null;
var slotNumber = 0;
var nMax = 82;
var nMin = 0;
var statusFlg = 'stop';

var units = ['1','2','3','4','5','6','7','8','9','10',
          '11','12','13','14','15','16','17','18','19','20'];

startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);

function start() {
	displayArea.value = 'test';
	if(statusFlg==='stop'){
        
        //ステータスを開始状態に
    		statusFlg = 'start';

        clearInterval(slotTime);

  		//ランダムな整数を発生してタイマー秒間隔で無限にループ
      slotTime = setInterval(function () {
			slotNumber = Math.floor(Math.random()*(nMax-nMin+1))+nMin;
      displayArea.value = units[slotNumber];
      }, 10);
    
      //ボタンの表示をSTOPに変更
      startButton.innerHTML = 'STOP';
	}else if(statusFlg==='start'){
	  	clearInterval(slotTime);
    	slotTime = null;

    //ステータスを停止状態に
	  statusFlg = 'stop';		
  
  	//出現したキャラは配列から削除
		units.splice(slotNumber,1);
		nMax -= 1;
    //ボタンの表示をSTARTに変更
    startButton.innerHTML = 'START';
	}
}

