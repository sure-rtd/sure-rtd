/*****************************************************/
//共通変数設定
/*****************************************************/
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var resetButton = document.getElementById('reset');
var displayArea = document.getElementById('display');
var imageArea = document.getElementById('image');
var resultArea = document.getElementById('result');
var slotTime = null;
var result = [];
var slotNumber = 0;
var nMax = 101;
var nMin = 0;
var statusFlg = 'stop';

var units = [
'グレン',
'リヴィオ',
'サヤ',
'エルフィ',
'アレン',
'カイン',
'マリア',
'ルカ',
'フェンリス',
'クトゥール',
'アルトリウス',
'ゼロシキ',
'イザナギ',
'ゼッターマン',
'Asmk-2',
'アヌビス',
'グリムドア',
'リヴァイア',
'まゆ',
'クロノ',
'ヴェルベット',
'イデア',
'ル・フェイ',
'ユーリカ',
'よりしろ',
'オーガスタス',
'ルーク',
'アラン',
'エイゼル',
'ジョセフ',
'フィリス',
'ウルスラ',
'エンゼリカ',
'ヴァイオラ',
'フィオナ',
'フォスター',
'ターナー',
'エドワーズ',
'スミス',
'ロビン',
'レイチェル',
'メアリー',
'ローザ',
'ノーラ',
'ローレッタ',
'さくら',
'かすみ',
'つばき',
'あやめ',
'ぼたん',
'にじょう',
'ななお',
'ひめじ',
'わかまつ',
'まつえ',
'はるな',
'いせ',
'みかさ',
'ながと',
'せっつ',
'あかぎ',
'かが',
'ちとせ',
'りゅうじょう',
'しなの',
'ザイフリート',
'ブリュンヒルデ',
'あまぎ',
'マクスウェル',
'ヤマト',
'ヴァルザーク',
'カルマ',
'イザベラ',
'ディオーネ',
'ナタル',
'シェルクス',
'ノア',
'ヴァルトルス',
'ネフティリア',
'フラウ',
'あまてらす',
'マチルダ',
'アリス',
'シモーヌ',
'ドン・ポルタ',
'ヴァルク',
'ヒルダ',
'りんどう',
'アリア',
'ジョニー',
'ファウスト',
'シェルツ',
'ロキ',
'ヴィーラ',
'ジャクリーン',
'ホムラ',
'ジカイ',
'キヌガサ',
'ヒミコ',
'コトワリ',
'アルテミス',
'デウス',
'ジ・オース'
];

var imgUrl = [
'https://3.bp.blogspot.com/-6HVKKn-Mc9s/VvFKxEn-7mI/AAAAAAAAKOo/Ug_KeI_zQ9UP6taqKIB106usCnPTJqjow/s1600/01.png"',
'https://3.bp.blogspot.com/-0pNjPl3ALOc/VvFKxBqpWSI/AAAAAAAAKOs/4S25qzr0w30uHPKmSZvkwCc4E8XcpUjCg/s1600/02.png"',
'https://4.bp.blogspot.com/--lEDdPx0hyk/VvFKxPs2LGI/AAAAAAAAKOk/ogGkYtxBbJg1zQo0qoMkv3sFCAuZbp5-A/s1600/03.png"',
'https://2.bp.blogspot.com/-oayeKkkEmew/VvFKxzeYNXI/AAAAAAAAKOw/O7pjGzxTXZQV6wjlZtLlGDO7ftnCLbdoA/s1600/04.png"',
'https://3.bp.blogspot.com/-8IPXd6_PsMg/VvFKyHL8k3I/AAAAAAAAKO0/9c85jPvCBssFaRRfkr_R4QmJrCYLU5Obg/s1600/21.png"',
'https://3.bp.blogspot.com/-_z4T8XDnWrk/VvFKyEl9dEI/AAAAAAAAKO4/YH8CcHuzIus3IE5HMaLWehqFrFRr8zOGg/s1600/22.png"',
'https://1.bp.blogspot.com/-6gsCXG6bIew/VvFKyfAU5WI/AAAAAAAAKO8/-2iSbp9bHg80oo0kYA2iwxWQRe3AjuVPg/s1600/23.png"',
'https://4.bp.blogspot.com/-rlOMqhubUaY/VvFKy4XruuI/AAAAAAAAKPA/XjD_cYlbSWkWZjCRcO57jih7dATif57xw/s1600/24.png"',
'https://3.bp.blogspot.com/-9r-uUwY6jdQ/VvFKy97LW8I/AAAAAAAAKPE/KanaOT2C-r8OGtOCmRAcauX5gdfJOBnLg/s1600/icon05.png"',
'https://2.bp.blogspot.com/-ABLxPv-l-bE/VvFKzfxiP5I/AAAAAAAAKPI/j21MmX9UW78K_xfywfx7riOk0Uk6glM6Q/s1600/icon06.png"',
'https://2.bp.blogspot.com/-lKWn2kvIYgE/VvFKzZxnmPI/AAAAAAAAKPM/KI0BSaF0ysse4hptB-JdJXGBkHwxoI1Mw/s1600/icon07.png"',
'https://3.bp.blogspot.com/-OrtAjpG6gcI/VvFKzqZdd0I/AAAAAAAAKPQ/g9aPP6T-yB4UEThYx53OOaiJwC-NW0qVw/s1600/icon08.png"',
'https://2.bp.blogspot.com/-DDswbPlUx9w/VvFKz34GuaI/AAAAAAAAKPU/acXqXrEYNmI9qUBPZnj9UXTuc41EHPonQ/s1600/icon09.png"',
'https://1.bp.blogspot.com/-EbKhScdvgzc/VvFKz6E3nfI/AAAAAAAAKPY/oS5I-Q94zXMhVXYiIMDXh1il1nP77iHGg/s1600/icon10.png"',
'https://1.bp.blogspot.com/-PfCwEWkoB0w/VvFK0RVI9LI/AAAAAAAAKPg/fLyam6JqWekH9N3UbuopOB2PvlGLTTpaQ/s1600/icon11.png"',
'https://2.bp.blogspot.com/-132CKZx2Gf0/VvFK1aF5hZI/AAAAAAAAKP0/W_Qa01NZqeUHVoKqBWmwR4LLwwghwhDQw/s1600/icon12.png"',
'https://2.bp.blogspot.com/-MbBk2GbO28U/VvFK3Fahw-I/AAAAAAAAKQM/wwhUhuZoPLUpKDcqOyLUPxVOt93d_wq7g/s1600/icon13.png"',
'https://2.bp.blogspot.com/-cb63WeCBR70/VvFK4kyMpXI/AAAAAAAAKQk/HYxDm4uZ3Xod3_67rMLrabaOgdYQ2VxKA/s1600/icon14.png"',
'https://4.bp.blogspot.com/-llVdFXZSl4c/VvFK67YERtI/AAAAAAAAKRI/HmoSOftYf_szIFdyyVz1AOd3Wy-C8yUvA/s1600/icon15.png"',
'https://3.bp.blogspot.com/-BZpW2ibeVSI/VvFK7J5KiqI/AAAAAAAAKRM/SLVxEsdEkIsvjw4GgHhsOJO8v0tFTOmrA/s1600/icon16.png"',
'https://1.bp.blogspot.com/-Buo0L2f-37k/VvFK7YbUogI/AAAAAAAAKRQ/esfLH6igIJEtkpF0dMJmYFCl8cfGxz-QQ/s1600/icon17.png"',
'https://2.bp.blogspot.com/-iwBazESn_Rc/VvFK7sDltnI/AAAAAAAAKRU/SW5k4VscBw4uxZWuef_jiA2iQYHWmTtNQ/s1600/icon18.png"',
'https://4.bp.blogspot.com/-Bixjj-aJXhU/VvFK7myPQ_I/AAAAAAAAKRY/vRoM4zAJfbQ48TAMlAExlzWncKY8qOQSA/s1600/icon19.png"',
'https://4.bp.blogspot.com/-3rKr8CQb068/VvFK70aCFvI/AAAAAAAAKRc/0IfWNYk0k_k27GU80Ku5FmUH7NnPo6D5g/s1600/icon20.png"',
'https://1.bp.blogspot.com/-VSm5dHY0rWU/VvFK8Be0H-I/AAAAAAAAKRg/g_EW-2zD7D8-fdzwM4yt51iPgeVf0_gnw/s1600/icon25.png"',
'https://2.bp.blogspot.com/-MIwFLiY2VjQ/VvFK8YeiFMI/AAAAAAAAKRk/cAKpiKHoAY4FbENihgz135qvUz8A-rb1A/s1600/icon33.png"',
'https://2.bp.blogspot.com/-_InLtMxgEbE/VvFK8T-mubI/AAAAAAAAKRo/tpd-iDBPrCYWBeUirLH-tRkjRGK3tNtnA/s1600/icon34.png"',
'https://2.bp.blogspot.com/-5YPc57hl6uA/VvFK8pcweuI/AAAAAAAAKRs/9B5t0Lc5B9scNDZmelA2u8k3Jvpa43hmQ/s1600/icon35.png"',
'https://2.bp.blogspot.com/-v7VKrWywZqY/VvFK8yp83nI/AAAAAAAAKRw/flcgpLSq7BYsnJrhO0kF7a2vuJXpN-PxA/s1600/icon36.png"',
'https://2.bp.blogspot.com/-DmT4p3l6lAE/VvFK8_2J_xI/AAAAAAAAKR0/HrMUgGaCVZ84KsqyqW2WyNmGTC9pIHdGQ/s1600/icon37.png"',
'https://1.bp.blogspot.com/-daPy0dpWisg/VvFK9awyIOI/AAAAAAAAKR4/4TShb9D2-moOGszWr3kG_RIeqLBcwVUSw/s1600/icon38.png"',
'https://2.bp.blogspot.com/-gIyQN8cWfcw/VvFK9al_v7I/AAAAAAAAKR8/M2ZTB6jJFUM4U5cB-1NTjHAFeGtz9tSkA/s1600/icon39.png"',
'https://1.bp.blogspot.com/--BYKONeSFl0/VvFK9oDxZFI/AAAAAAAAKSA/yuHUTLMfuPU9ZQoQhblg3lzejOwzLzf8A/s1600/icon40.png"',
'https://3.bp.blogspot.com/-Bb0c0YsbTvk/VvFK99mAlII/AAAAAAAAKSI/BBOA_UWyqEMRXV3zHOnGdJ0x2feikOOTw/s1600/icon41.png"',
'https://2.bp.blogspot.com/-e7Scn7EZFlM/VvFK98NsYAI/AAAAAAAAKSE/LaWysyqucGsuvmMCxCB_nNZtJETFcsg1A/s1600/icon42.png"',
'https://3.bp.blogspot.com/-hJtzfp8_GNE/VvFK-EaKpCI/AAAAAAAAKSM/_6CZQOBDRNQD7ZsZbqa5FcTW-JtNPE1Kg/s1600/icon43.png"',
'https://2.bp.blogspot.com/-CfYu2wYnsAQ/VvFK-hiG-0I/AAAAAAAAKSQ/dQOfEeRzvcIszCAbdsxZQqCFWdIXT_OuA/s1600/icon44.png"',
'https://2.bp.blogspot.com/-pcmMdiK_07Y/VvFK-mTWgjI/AAAAAAAAKSU/IjvD453P1yQFM6i3UJKXAxccuzvq-B75g/s1600/icon45.png"',
'https://3.bp.blogspot.com/-W68ZZzceC4w/VvFK-4F_eLI/AAAAAAAAKSY/9ZmhPMr5RiopYjZvJy901XDRt9pJjUO6w/s1600/icon46.png"',
'https://2.bp.blogspot.com/-8QDSQ8lTGN4/VvFK_J2kCQI/AAAAAAAAKSc/DfNExcvSdKEGJuWjSQtu3xRZo479WBb1w/s1600/icon47.png"',
'https://2.bp.blogspot.com/-F3s7h8eeSro/VvFK_UStIqI/AAAAAAAAKSg/ZDPEb-RIMGYmHA-sSYoRwPr-HVEtY1-Qg/s1600/icon48.png"',
'https://2.bp.blogspot.com/-FdO1j85Fe84/VvFK_TbbBUI/AAAAAAAAKSk/vR1uUWWE2bwnNxIg21CDPUnu2IMyRkxTQ/s1600/icon49.png"',
'https://3.bp.blogspot.com/-K27AG6zyaYc/VvFK_oH-DCI/AAAAAAAAKSo/xpNdqDIs8e4Z59RSeC38OLRWX7zfLGUSQ/s1600/icon50.png"',
'https://2.bp.blogspot.com/-EAZ-l03UzNo/VvFK_6raENI/AAAAAAAAKSs/7ieGIftCgggIXik9kbDP9kEo-5pyYDNOA/s1600/icon51.png"',
'https://1.bp.blogspot.com/-ZmxbPGrSewU/VvFK_19m3yI/AAAAAAAAKSw/3M55Cjkd7OQ0KihpTOL8XUOtzYzP0hR_Q/s1600/icon52.png"',
'https://3.bp.blogspot.com/-MfclG9Wyw_o/VvFLAECylPI/AAAAAAAAKS0/JPnGlfrCz9c92Ks-KqaBrojHXXo6mJApQ/s1600/icon65.png"',
'https://4.bp.blogspot.com/-c1ZxtNGjw1A/VvFLAc2yLYI/AAAAAAAAKS4/Omo8D-x0LsUGvFl5q03yrs4bymJIE0AWg/s1600/icon66.png"',
'https://3.bp.blogspot.com/-sGsWtIXgOPA/VvFLAjzDY6I/AAAAAAAAKS8/mMJogjtdle4C0BOZle2xOifZC6r8Ioi6Q/s1600/icon67.png"',
'https://3.bp.blogspot.com/-H7HUPzKA650/VvFLAni_VwI/AAAAAAAAKTA/y_lNCUtcr-4tytJf7xbjRzxFhVlMLpWLQ/s1600/icon68.png"',
'https://4.bp.blogspot.com/-FEJZxS-XpYE/VvFLA_0OQ1I/AAAAAAAAKTE/eX6UdOwad4si9x_sCbalvcBZrL7ozctAA/s1600/icon69.png"',
'https://2.bp.blogspot.com/-GDZlXz6f7V4/VvFLBBdEC8I/AAAAAAAAKTI/sMPBshFLABc2wrDzb4Vh7QnGXSxzaIjgg/s1600/icon70.png"',
'https://1.bp.blogspot.com/-2_buOJzLVUA/VvFLBNZeJUI/AAAAAAAAKTM/Geu8ggkAPUke9q_iS0k5XhpDQbVN2mfqQ/s1600/icon71.png"',
'https://2.bp.blogspot.com/-gqAxalxWq7k/VvFLBRbKa7I/AAAAAAAAKTQ/WwUfBiJvT9o65oVkJHcC8TQ4nO8tjIr2w/s1600/icon72.png"',
'https://4.bp.blogspot.com/-R9D5eET-iOM/VvFLBpXBhBI/AAAAAAAAKTU/pCwcesbz5Og-B9yN0OzQ-wGdTF7ZwcT7g/s1600/icon73.png"',
'https://3.bp.blogspot.com/-MJTZk-l1pu0/VvFLB253aUI/AAAAAAAAKTY/7CexfqwlhRQWgJ0aHidP7qV64dvvWPgAA/s1600/icon74.png"',
'https://2.bp.blogspot.com/-LHtNytdD-cs/VvFLCFFwjtI/AAAAAAAAKTc/yo5ReGmaEX8tEOwtw-Yu8QCS7NSqZAuKA/s1600/icon75.png"',
'https://1.bp.blogspot.com/-2UKgJhI-vyk/VvFLCNc4pJI/AAAAAAAAKTg/kt0g-4uGMMctDKx6yhZDsRch9dn169w_Q/s1600/icon76.png"',
'https://1.bp.blogspot.com/-klyH1A02Y9E/VvFLCfZL_gI/AAAAAAAAKTk/8PuZRBLaYGMzNARlg1EsGpBGOv7Gpo8iw/s1600/icon77.png"',
'https://4.bp.blogspot.com/-TzkMbhyMT-o/VvFLCumXs3I/AAAAAAAAKTo/_vw0s87ZE-M_P8vBV_0LfQ1mWEULWctYA/s1600/icon78.png"',
'https://1.bp.blogspot.com/-kBkL3ZjwM-g/VvFLCivo72I/AAAAAAAAKTs/agQ5MEmtotcVJqCnJ3a_J2qotk46w7OZw/s1600/icon79.png"',
'https://2.bp.blogspot.com/-Dagx6B36S5g/VvFLC7S75gI/AAAAAAAAKTw/f981bMLeJn841gXL0wNa2EQjKt_8k1_UQ/s1600/icon80.png"',
'https://4.bp.blogspot.com/-auUBnMUVj70/VvFLDLM83aI/AAAAAAAAKT0/hDnYytICcI4xVa09seYpQ_45hR6yksj2A/s1600/icon81.png"',
'https://1.bp.blogspot.com/-N-vgRy8wLyU/VvFLDXMYGkI/AAAAAAAAKT4/-efF3mAgEOYcRnV2zRZoqxhlO9Ss_aieQ/s1600/icon82.png"',
'https://3.bp.blogspot.com/-siguorUrAKw/VvFLDfwJ2BI/AAAAAAAAKT8/6B3C4AYA94kXD5H3yTOIe1UAzMbi_carw/s1600/icon83.png"',
'https://4.bp.blogspot.com/-Lbvllumonfw/VvFLDpQnQ4I/AAAAAAAAKUA/P74DxZ1XTvkKjGav-ptqLBBSieGzgntbQ/s1600/icon84.png"',
'https://4.bp.blogspot.com/-BXUGbfRYijM/VvFLD0IOFQI/AAAAAAAAKUE/TaolY-Ee8jMuJ_K9ZbVO-pwRPDbcr8sDQ/s1600/icon85.png"',
'https://4.bp.blogspot.com/-4n-Xs1l3BO4/VvFLD4MlJ-I/AAAAAAAAKUI/GBbm6Fdx1rwCUmIkyGOPuIjWOuZtgCyVw/s1600/icon86.png"',
'https://2.bp.blogspot.com/-9qhCqo-xoc0/VvFLEJ5P0jI/AAAAAAAAKUM/CNQz3e-IA-sfquTd91OGB16whZNYzLk5w/s1600/icon87.png"',
'https://1.bp.blogspot.com/-tLDkGfHVTZE/VvFLE7cpyWI/AAAAAAAAKUY/J_jVo5VbYlkvttqbd1QCGpvs6ZlzlNeFw/s1600/icon88.png"',
'https://1.bp.blogspot.com/-J6ajaMmystc/VvFLERMYRMI/AAAAAAAAKUQ/PiqmmlAFTI4iWin13JKjcwQlI81GeSlTA/s1600/icon89.png"',
'https://1.bp.blogspot.com/-RD1annAxkwE/VvFLEg7g2DI/AAAAAAAAKUU/bw9ET0bVmOgs1w2fisphj_Z1G9y5M4lwg/s1600/icon90.png"',
'https://2.bp.blogspot.com/-3tk8cfoGwog/VvFLFH8dKEI/AAAAAAAAKUc/ty_VcX2KBN8ooO9DkFZFK8m6pyqKOUjCw/s1600/icon91.png"',
'https://2.bp.blogspot.com/-AIQtHgTW43U/VvFLFdCPRtI/AAAAAAAAKUg/cYtJ_HGbDsE8q_dQOritN7wlD4gK2SwUw/s1600/icon92.png"',
'https://3.bp.blogspot.com/-4DSfbHJz-ZQ/VvFLFRs175I/AAAAAAAAKUk/zo_eXc07OIItLjMTeoQRhAGQOTfi99FFQ/s1600/icon93.png"',
'https://4.bp.blogspot.com/-cWNFNvbSyUk/VvFLFgM0SrI/AAAAAAAAKUo/2ByjBUgy5RAPZgFuAyCENgb0LGrRjCPBQ/s1600/icon94.png"',
'https://1.bp.blogspot.com/-lybcpYvtZm8/VvFLF2ogOnI/AAAAAAAAKUs/ORBA8lhDnY8PYoNTE4L1VrxYjqe6L6jeA/s1600/icon95.png"',
'https://2.bp.blogspot.com/-lhLxbg8SIT0/VvFLGP1zlTI/AAAAAAAAKUw/reRFLyetDFUFRjGupRlORpVlqXGAHiW-Q/s1600/icon96.png"',
'https://1.bp.blogspot.com/-1x2JhMElUCE/VvFLGOfLFeI/AAAAAAAAKU0/uC5yTe-_ync9-1V3L5fCrVknK0GuV8gjw/s1600/icon97.png"',
'https://1.bp.blogspot.com/-lBWLquhvbYE/VvFLGVQRuoI/AAAAAAAAKU4/PymX-56LNkUQNtPpdFG8j6y5K8lkNfH3A/s1600/icon98.png"',
'https://1.bp.blogspot.com/-FELWdmPWZFE/VvFLGujosbI/AAAAAAAAKU8/wjMJlRgdlOcH_xF-307iEo1H08TmdcA2Q/s1600/icon99.png"',
'https://4.bp.blogspot.com/-j8sohjWjwRw/VvFK0MZEsqI/AAAAAAAAKPc/UlmrKW9Tu58fx8glbwpAMAE6_dfwDVRtQ/s1600/icon100.png"',
'https://2.bp.blogspot.com/-1PAg4gXVRt0/VvFK0engReI/AAAAAAAAKPk/VUn-IFzi1H0hXJmjHcwN11y9WlFCKAYdQ/s1600/icon111.png"',
'https://3.bp.blogspot.com/-Hpl0lRtS3Gc/VvFK0pTIMyI/AAAAAAAAKPw/EB7ZPyOsSVgNv_PW9TmuR5KGcb6ZTmADA/s1600/icon117.png"',
'https://2.bp.blogspot.com/-LthSJ2ffoWg/VvFK0-onOII/AAAAAAAAKPo/U_-Tzmt7Bz8WgzQNuSulNicD3KBwoaF7A/s1600/icon118.png"',
'https://1.bp.blogspot.com/-UqyHxOxxTrg/VvFK1BEnWDI/AAAAAAAAKPs/4_cUXAnWPl8b4-Tukx3SgdtX0WJzpu0RQ/s1600/icon119.png"',
'https://1.bp.blogspot.com/-fxLdqz_VJmo/VvFK1pLA9lI/AAAAAAAAKP4/E9FEaeIwPocFQzmFHtWnqTYEj1cHqYNdA/s1600/icon120.png"',
'https://2.bp.blogspot.com/-n0F4gzubIcI/VvFK4tHEtVI/AAAAAAAAKQo/jpWCAWt1EmwK0siyd81eXsCoVSkuoZkwg/s1600/icon124.png"',
'https://4.bp.blogspot.com/-j1U_jlYxGlg/VvFK17qm6zI/AAAAAAAAKP8/TRjqDhnuutcfI16irr2rYAFKfBaVD73Iw/s1600/icon125.png"',
'https://4.bp.blogspot.com/-pPcycS_6_eg/VvFK2PUaEyI/AAAAAAAAKQA/RoqxsYN-a58RzrK1BaLJ9vHmbK3KGjSxw/s1600/icon126.png"',
'https://4.bp.blogspot.com/-rCUnuQLiDMk/VvFK2i1SoSI/AAAAAAAAKQE/S8ZJuNLSUKwYduCikiqrnXW50LhBqHP6w/s1600/icon127.png"',
'https://3.bp.blogspot.com/-5RBrSFpDd0k/VvFK2opTE2I/AAAAAAAAKQI/FhMipsGAuK0yvVX92WXG6k2yTAEPicOEw/s1600/icon128.png"',
'https://1.bp.blogspot.com/-aGoGQDWs2Hs/VvFK3bxz3uI/AAAAAAAAKQQ/GHhEXB2Cqxg7r_oWJ_WZAT-Axo8i832dg/s1600/icon135.png"',
'https://1.bp.blogspot.com/-Jz_VuCdcvsw/VvFK3qP3RLI/AAAAAAAAKQU/9OqJcsuY5LkdIHsO42AsK-LCxsFQxUlPQ/s1600/icon136.png"',
'https://3.bp.blogspot.com/-hlpsQTCwLxM/VvFK36PGTWI/AAAAAAAAKQY/oGUL208lun06O7n9ioMvY6t2Wig-7fcig/s1600/icon137.png"',
'https://3.bp.blogspot.com/-PqaM0b-RaF8/VvFK4LXt1iI/AAAAAAAAKQc/2vCokzwRCsQNxv-DnAWzRHEZE-bdzzaNA/s1600/icon138.png"',
'https://3.bp.blogspot.com/-VoVhBOh8lRQ/VvFK4W3Bf7I/AAAAAAAAKQg/FXxdX49PikgzdZR-Dn64biIvKQYSXlLAw/s1600/icon139.png"',
'https://2.bp.blogspot.com/-99Awa5vewQ4/VvFK47h8nOI/AAAAAAAAKQw/ly0ixYENbCgXDCw2uOTHorVgvhUp2oR6w/s1600/icon140.png"',
'https://2.bp.blogspot.com/-cg2s2Up1Lk0/VvFK5Oq_VGI/AAAAAAAAKQs/NYgK7AOv15sc5oS7zeXF4T8s0f3eRC8FA/s1600/icon141.png"',
'https://2.bp.blogspot.com/-rfRUoyAcVcQ/VvFK6AJYWJI/AAAAAAAAKQ0/NtH8tBeYMH4H34f7uVmMwn4YC6-uAI6cg/s1600/icon142.png"',
'https://2.bp.blogspot.com/-YNMFZcPjWJU/VvFK6B-lGsI/AAAAAAAAKQ4/XI2Ji_A8oqo9CU_ejKsmbWBRXkT2NPn8Q/s1600/icon143.png"',
'https://1.bp.blogspot.com/-CfkjhOZW328/VvFK6UiM8DI/AAAAAAAAKQ8/Dgvhwx90dUsYa49cUAAEGWHDIBKZedHEw/s1600/icon144.png"',
'https://4.bp.blogspot.com/-m1PNeQdtKtQ/VvFK6gB6JXI/AAAAAAAAKRA/dfKgFZrfZYofPW-L2jbUoHAaHv4BKYllA/s1600/icon145.png"',
'https://3.bp.blogspot.com/-o_B2MVSGRqY/VvFK69bgVrI/AAAAAAAAKRE/WHcBpQQs6F8cPXTY2fL88zf2FL8J_PXfA/s1600/icon146.png"'
];
//localStorage.removeItem("rtd_unit_status_items");

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

/*****************************************************/
//データ取得	getUnitData
//WeDataからJSONPで取得し、localstorageに格納する処理。
//起動時に自動実行
//	[LocalStorage Key]
//		rtd_unit_status_items : ユニットステータスデータ本体。
/*****************************************************/
/*
  var flgNeedGetJsonData = false;
  var chkInfo;
  var chkItems;
  // ローカルストレージ対応判定
  if (!localStorage) {
    alert('ローカルストレージに対応したブラウザを使用してください。');
    flgNeedGetJsonData = true;
    retrun(false);
  }
	
      var url = 'http://wedata.net/databases/rtd_unit_status/items.json?callback=?';
      $.getJSON(url, function(jsonUnitData) {
        localStorage.setItem('rtd_unit_status_items', JSON.stringify(jsonUnitData));
      });

	//LSからデータをJSON形式で引出
  var unitdata = JSON.parse(localStorage.getItem('rtd_unit_status_items'));

  //データ整理(Noで昇順ソート)
  unitdata.sort(function(val1, val2) {
    return (Number(val1.data.No) > Number(val2.data.No) ? 1 : -1);
  });
*/
/*****************************************************/
//スロット開始：STARTボタンを押すと作動
/*****************************************************/
function start() {
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
	}else{
  //停止状態以外では何もしない
  }
}

/*****************************************************/
//スロット停止：STOPボタンを押すと作動
/*****************************************************/
function stop() {
	if(statusFlg==='start'){
		//ステータスを停止状態に
		statusFlg = 'stop';
		
    if (slotTime) {
	  	clearInterval(slotTime);
    	slotTime = null;
  	}
  
  	//画像を表示
  	imageArea.src = imgUrl[slotNumber];
		
    //resultエリアを加工して出力
		result.push(units[slotNumber]);
  	var resultText = '';
  	for (var key in result) {
  		resultText += result[key] + '\n';
  	}
  	resultArea.value = resultText;
	
  	//出現したキャラは配列から削除
		units.splice(slotNumber,1);
		imgUrl.splice(slotNumber,1);
		nMax -= 1;
	}else{
  //開始状態以外では何もしない
  }
}

/*****************************************************/
//スロットリセット：RESETボタンを押すと作動し、ページをリロード
/*****************************************************/
function reset() {
/*	if (slotTime) {
		clearInterval(slotTime);
		slotTime = null;
	}
    displayArea.value = '';
    resultArea.value = '';
		result = [];
		i = 0;
*/
    location.reload();
}
