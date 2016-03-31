/***************************
Powered by Sure
Tuned by Mr.Gran @ all of thanks
/***************************
/***************************
//計算ボタン押下時メイン処理
****************************/
function calc() {

  //初期化
  var party_hit = 0;
  var party_base_dmg = 0;
  var party_full_dmg = 0;
  var party_exp_dmg = 0;

  //敵防御
  var enemy_def = parseInt($('enemy_def').value);
  
  //画面入力値取得
  for (i = 1; i < 7; i++) {
    var num = [i]; //列番号
    //入力値読込み
    //整数型は整数型に
    //小数型は5桁切上げに
    //ユニット攻撃力
    var base_atk = parseInt($('base_atk' + num).value);
    //攻撃力ボーナス
    var bonus_atk = parseInt($('bonus_atk' + num).value);
    //特化ダメージ
    var bonus_dmg = parseInt($('bonus_dmg' + num).value);
    //アサルト補正率
    var assault_rate = (parseFloat($('assault_rate' + num).value) * 100000 + 0.5) / 100000;
    //全力補正率
    var full_rate = (parseFloat($('full_rate' + num).value) * 100000 + 0.5) / 100000;
    //弱点補正
    var bonus_weak = parseInt($('bonus_weak' + num).value);
    //属性補正
    var bonus_element = parseInt($('bonus_element' + num).value);
    //属性補正数
    var number_element = parseInt($('number_element' + num).value);
    //チェイン補正
    var chain_rate = Math.floor(parseFloat($('chain_rate' + num).value) * 100000 + 0.5) / 1000;
    //ダメージ倍率
    var multiple_rate = (parseFloat($('multiple_rate' + num).value) * 100000 + 0.5) / 100000;
    //ヒット数
    var number_hit = parseInt($('number_hit' + num).value);
    //弱点有(1)無(0)
    var weak_flg = $('weak_flg' + num).value;
    //カットイン倍率
    var cutin_rate = (parseFloat($('cutin_rate' + num).value) * 100000 + 0.5) / 100000;

    //ユニット単位算出(戻り：json配列)
    var jsonDmg = calc_dmg(num, base_atk, bonus_atk,
      bonus_dmg, assault_rate, full_rate,
      bonus_weak, bonus_element, number_element,
      chain_rate, multiple_rate, number_hit, weak_flg, cutin_rate, enemy_def);

    //ユニット単位出力
    setUnitDmg(num, jsonDmg);

    //パーティ合計Hit数計算
    party_hit += number_hit;

    //パーティ合計ダメージ計算
    //基礎ダメージ(下限値)
    party_base_dmg += jsonDmg["total_base_dmg"];
    //全力ダメージ(上限値)
    party_full_dmg += jsonDmg["total_full_dmg"];
    //期待ダメージ(期待値)
    party_exp_dmg += jsonDmg["total_exp_dmg"];

  }

  //合計Hit数出力
  $('party_hit').value = party_hit;
  //合計ダメージ出力
  $('party_base_dmg').value = party_base_dmg;
  $('party_full_dmg').value = party_full_dmg;
  $('party_exp_dmg').value = party_exp_dmg;

}

/***************************
//デフォルトセットボタン押下時
****************************/
function setDef() {
  for (i = 1; i < 7; i++) {
    $('base_atk' + [i]).value = "10000";
    $('bonus_atk' + [i]).value = "0";
    $('bonus_dmg' + [i]).value = "0";
    $('assault_rate' + [i]).value = "0.1";
    $('full_rate' + [i]).value = "0.15";
    $('bonus_weak' + [i]).value = "100";
    $('bonus_element' + [i]).value = "300";
    $('number_element' + [i]).value = "0";
    $('chain_rate' + [i]).value = "0.0";
    $('multiple_rate' + [i]).value = "1.0";
    $('number_hit' + [i]).value = "1";
    $('weak_flg' + [i]).value = "1";
    $('cutin_rate' + [i]).value = "0";
  }
}

/***************************
//値クリアボタン押下時
//  fromNum:対象列番号/null=全列
****************************/
function clr(fromNum) {
  var toNum = 7;
  if (fromNum > 0) {
    toNum = fromNum + 1;
  } else {
    fromNum = 1;
  }
  for (i = fromNum; i < toNum; i++) {
    $('base_atk' + [i]).value = "0";
    $('bonus_atk' + [i]).value = "0";
    $('bonus_dmg' + [i]).value = "0";
    $('assault_rate' + [i]).value = "0";
    $('full_rate' + [i]).value = "0";
    $('bonus_weak' + [i]).value = "0";
    $('bonus_element' + [i]).value = "0";
    $('number_element' + [i]).value = "0";
    $('chain_rate' + [i]).value = "0";
    $('multiple_rate' + [i]).value = "0";
    $('number_hit' + [i]).value = "0";
    $('weak_flg' + [i]).value = "0";
    $('cutin_rate' + [i]).value = "0";
  }

}

/***************************
//防御クリアボタン押下時
****************************/
function clr_def() {
    $('enemy_def').value = "0";
}

/***************************
// ユニット単位出力
//  num:列番号
//	jsonDmg:集計結果JSON
****************************/
function setUnitDmg(num, jsonDmg) {
  //デバッグ出力
  $('atk' + num).value = jsonDmg['atk'];
  $('atk_dmg' + num).value = jsonDmg["atk_dmg"];
  $('assault_dmg' + num).value = jsonDmg["assault_dmg"];
  $('full_dmg' + num).value = jsonDmg["full_dmg"];
  $('weak_dmg' + num).value = jsonDmg["weak_dmg"];
  $('element_dmg' + num).value = jsonDmg["element_dmg"];
  $('unit_base_dmg' + num).value = jsonDmg["unit_base_dmg"];
  $('unit_full_dmg' + num).value = jsonDmg["unit_full_dmg"];
  $('total_base_dmg' + num).value = jsonDmg["total_base_dmg"];
  $('total_full_dmg' + num).value = jsonDmg["total_full_dmg"];
  $('total_exp_dmg' + num).value = jsonDmg["total_exp_dmg"];

}


/***************************
// ダメージ集計関数
//  戻り：JSON
****************************/
function calc_dmg(
  num, base_atk, bonus_atk, bonus_dmg,
  assault_rate, full_rate, bonus_weak,
  bonus_element, number_element, chain_rate,
  multiple_rate, number_hit, weak_flg, cutin_rate, enemy_def
) {
  //合計攻撃力計算
  var atk = base_atk + bonus_atk;
  //攻撃力ダメージ計算
  var atk_dmg = Math.floor(Math.pow(atk, 0.95));
  //アサルトダメージ計算
  var assault_dmg = Math.floor(atk * assault_rate);
  //基礎ダメージ計算
  var base_dmg = atk_dmg + assault_dmg;
  //全力ダメージ計算
  var full_dmg = base_dmg * 2;
  //弱点ダメージ計算
  if (weak_flg == "1") {
    var weak_dmg = Math.floor(Math.pow(atk, 0.46) * bonus_weak);
  } else {
    var weak_dmg = 0;
  };
  //属性ダメージ計算
  var element_dmg = bonus_element * number_element;

  //ダメージ集計
  //基礎ダメージ(下限値)集計
  var unit_base_dmg = Math.floor((base_dmg + bonus_dmg + weak_dmg + element_dmg - enemy_def) * multiple_rate);
  //全力ダメージ(上限値)集計
  var unit_full_dmg = Math.floor((full_dmg + bonus_dmg + weak_dmg + element_dmg - enemy_def + atk * 0.09) * multiple_rate);
  //期待ダメージ(期待値)集計
  var unit_exp_dmg = Math.floor((base_dmg * (1 - full_rate) + full_dmg * full_rate + bonus_dmg + weak_dmg + element_dmg - enemy_def + atk * 0.04) * multiple_rate);
  //チェイン補正計算
  var hit_rate = [100, 60, 50, 40, 40, 40, 40, 30];
  for (j = 1; j < hit_rate.length; j++) {
    hit_rate[j] += chain_rate;
    if (hit_rate[j] >= 100) {
      hit_rate[j] = 100;
    }
  }

  //合計ダメージ計算
  var total_base_dmg = 0;
  var total_full_dmg = 0;
  var total_exp_dmg = 0;
  if (cutin_rate >= 1) {
    for (j = 1; j <= number_hit; j++) {
      if (j == number_hit) {
        //基礎ダメージ(下限値)
        total_base_dmg += Math.floor(unit_base_dmg * (cutin_rate));
        //全力ダメージ(上限値)
        total_full_dmg += Math.floor(unit_full_dmg * (cutin_rate));
        //期待ダメージ(期待値)
        total_exp_dmg += Math.floor(unit_exp_dmg * (cutin_rate));
      } else if (j < 8) {
        //基礎ダメージ(下限値)
        total_base_dmg += Math.floor(unit_base_dmg * (hit_rate[j - 1] / 100));
        //全力ダメージ(上限値)
        total_full_dmg += Math.floor(unit_full_dmg * (hit_rate[j - 1] / 100));
        //期待ダメージ(期待値)
        total_exp_dmg += Math.floor(unit_exp_dmg * (hit_rate[j - 1] / 100));
      } else {
        //基礎ダメージ(下限値)
        total_base_dmg += Math.floor(unit_base_dmg * (hit_rate[hit_rate.length - 1] / 100));
        //全力ダメージ(上限値)
        total_full_dmg += Math.floor(unit_full_dmg * (hit_rate[hit_rate.length - 1] / 100));
        //期待ダメージ(期待値)
        total_exp_dmg += Math.floor(unit_exp_dmg * (hit_rate[hit_rate.length - 1] / 100));
      }
    }
  } else {
    for (j = 1; j <= number_hit; j++) {
      if (j < 8) {
        //基礎ダメージ(下限値)
        total_base_dmg += Math.floor(unit_base_dmg * (hit_rate[j - 1] / 100));
        //全力ダメージ(上限値)
        total_full_dmg += Math.floor(unit_full_dmg * (hit_rate[j - 1] / 100));
        //期待ダメージ(期待値)
        total_exp_dmg += Math.floor(unit_exp_dmg * (hit_rate[j - 1] / 100));
      } else {
        //基礎ダメージ(下限値)
        total_base_dmg += Math.floor(unit_base_dmg * (hit_rate[hit_rate.length - 1] / 100));
        //全力ダメージ(上限値)
        total_full_dmg += Math.floor(unit_full_dmg * (hit_rate[hit_rate.length - 1] / 100));
        //期待ダメージ(期待値)
        total_exp_dmg += Math.floor(unit_exp_dmg * (hit_rate[hit_rate.length - 1] / 100));
      }
    }
  }


  //戻り値用JSON構築
  jsonDmg = {
    "total_base_dmg": total_base_dmg,
    "total_full_dmg": total_full_dmg,
    "total_exp_dmg": total_exp_dmg,
    "atk": atk,
    "atk_dmg": atk_dmg,
    "assault_dmg": assault_dmg,
    "base_dmg": base_dmg,
    "full_dmg": full_dmg,
    "weak_dmg": weak_dmg,
    "element_dmg": element_dmg,
    "unit_base_dmg": unit_base_dmg,
    "unit_full_dmg": unit_full_dmg,
    "unit_exp_dmg": unit_exp_dmg,
    "hit_rate": hit_rate,
    "total_base_dmg": total_base_dmg,
    "total_full_dmg": total_full_dmg,
    "total_exp_dmg": total_exp_dmg
  };

  //戻り
  return (jsonDmg);

}
