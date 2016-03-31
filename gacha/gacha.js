var calcButton = document.getElementById('calc');
var clearButton = document.getElementById('clear');

calcButton.addEventListener('click', calc);
clearButton.addEventListener('click', clear);

function calc(){
	var getRate1 = document.getElementById('getRate1');
	var getRate2 = document.getElementById('getRate2');
	var getRate3 = document.getElementById('getRate3');
	var getRate4 = document.getElementById('getRate4');
	var getNumber = document.getElementById('getNumber');
	var setRate = document.getElementById('setRate');
	var msg = document.getElementById('msg');
	var rate = 0;
	var textId = 0;
	var text =[
'まず引けません。素直に諦めるか、回数を増やしましょう。',
'まだまだ引けません。引いたら今日は自重した方が良いかも。',
'なかなか引けません。引けたらかなりラッキーでしょう。',
'わりと引けません。野球なら首位打者でしょう。',
'そこそこ引けます。引けなくても泣かない。',
'ぼちぼち引けます。当たるも八卦当たらぬも八卦の域。',
'なかなか引けます。引けなかったらご縁が無いのかも？',
'けっこう引けます。ここらが目安かもしれません。',
'かなり引けます。流石にここまでには引けるでしょう。',
'すごい引けます。外したら逆にすごいかも。',
'あなたが神か。'
  ];

	if(getRate1.checked){
    rate = Math.floor((1 - Math.pow(0.99,getNumber.value))*10000)/100;
		setRate.value = rate +'%';
		textId = Math.floor(parseInt(rate) / 10);
    msg.value = text[textId];
	}
	else if(getRate2.checked){
    rate = Math.floor((1 - Math.pow(0.98,getNumber.value))*10000)/100;
		setRate.value = rate +'%';
		textId = Math.floor(parseInt(rate) / 10);
    msg.value = text[textId];
	}
	else if(getRate3.checked){
    rate = Math.floor((1 - Math.pow(0.97,getNumber.value))*10000)/100;
		setRate.value = rate +'%';
		textId = Math.floor(parseInt(rate) / 10);
    msg.value = text[textId];
	}
	else if(getRate4.checked){
    rate = Math.floor((1 - Math.pow(0.96,getNumber.value))*10000)/100;
		setRate.value = rate +'%';
		textId = Math.floor(parseInt(rate) / 10);
    msg.value = text[textId];
	}
}

function clear(){
	var getNumber = document.getElementById('getNumber');
	var setRate = document.getElementById('setRate');
	var msg = document.getElementById('msg');
	getNumber.value = '';
	setRate.value = '';
	msg.value = '';
}