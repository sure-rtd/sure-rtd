//�f�[�^�����X�V�{�^��
$("#resetData").click(function() {
  $("#mess").text("Reloding...");
  localStorage.removeItem("rtd_accessory_status_info");
  localStorage.removeItem("rtd_accessory_status_items");
  getAccessoryData();
});

//��ʕ`��㏈��
$(document).ready(function() {
  //�f�[�^�擾���e�[�u������
  getAccessoryData();
});

/*****************************************************/
//�f�[�^�擾	getAccessoryData
//WeData����JSONP�Ŏ擾���Alocalstorage�Ɋi�[���鏈���B
//����������Ɍ㏈���Ƃ��āugetAccessoryData_after()�v�����s����B
//	[LocalStorage Key]
//		rtd_accessory_status_info : WeData��{���B�X�V������ێ��B
//		rtd_accessory_status_items : ���j�b�g�X�e�[�^�X�f�[�^�{�́B
/*****************************************************/
function getAccessoryData() {
  var flgNeedGetJsonData = false;
  var chkInfo;
  var chkItems;
  // ���[�J���X�g���[�W�Ή�����
  if (!localStorage) {
    alert('���[�J���X�g���[�W�ɑΉ������u���E�U���g�p���Ă��������B');
    flgNeedGetJsonData = true;
    retrun(false);
  } else {
    //LS���݃`�F�b�N
    chkInfo = localStorage.getItem('rtd_accessory_status_info');
    chkItems = localStorage.getItem('rtd_accessory_status_items');
    if (!chkInfo || !chkItems) {
      flgNeedGetJsonData = true;
    }
  }
  //LS�f�[�^�X�V�m�F�iJSONP�jrtd_accessory_status_info
  var url = 'http://wedata.net/databases/rtd_accessory_lists.json?callback=?';
  chkInfo = JSON.parse(chkInfo);
  $.getJSON(url, function(jsonAccessoryStatusInfo) {
    $("#mess").text("�f�[�^�X�V�m�F��...");
    if (flgNeedGetJsonData || (chkInfo['updated_at'] !=  jsonAccessoryStatusInfo['updated_at'])) {
      localStorage.setItem('rtd_accessory_status_info', JSON.stringify(jsonAccessoryStatusInfo));
      flgNeedGetJsonData = true;
    }

$("#lastUpdate").text("�f�[�^�ŏI�X�V: " + jsonAccessoryStatusInfo['updated_at']);

    //�f�[�^�擾���K�v�ȏꍇ
    if (flgNeedGetJsonData) {
      //�f�[�^�擾�iJSONP�j
      //�擾���Fhttp://wedata.net/databases/rtd_accessory_lists/items
      var url = 'http://wedata.net/databases/rtd_accessory_lists/items.json?callback=?';
      $.getJSON(url, function(jsonAccessoryData) {
        $("#mess").text("�f�[�^�擾���s��...");
        localStorage.setItem('rtd_accessory_status_items', JSON.stringify(jsonAccessoryData));
        getAccessoryData_after();
      });
    } else {
      getAccessoryData_after();
    }
  });
}

//�f�[�^�擾�㏈���֐�
function getAccessoryData_after() {
  createTable();
}

/*****************************/
//�e�[�u������
/*****************************/
function createTable() {

  $("#mess").text("�e�[�u��������...");
  //LS����f�[�^��JSON�`���ň��o
  var accessorydata = JSON.parse(localStorage.getItem('rtd_accessory_status_items'));

  //�f�[�^����(No�ŏ����\�[�g)
  accessorydata.sort(function(val1, val2) {
    return (Number(val1.data.No) > Number(val2.data.No) ? 1 : -1);
  });

  //tbody������
  $('table#accessoryStatusTable tbody *').remove();

	//�o�͗�쐬
  for (var key in accessorydata) {
    var workdata = accessorydata[key].data;
		var output = 	"<tr><td class='center'>" + workdata.No + 
									"</td><td class='left'>" + workdata.�����j�b�g + 
									"</td><td class='left'>" + workdata.���� +
									"</td><td class='left'>";
									
		if(Math.abs(parseInt(workdata.���C�t)) >= 0){
			output += "�̗�:" + workdata.���C�t + "<br>";
		}
		if(Math.abs(parseInt(workdata.�U����)) >= 0){
			output += "�U��:" + workdata.�U���� + "<br>";
		}
		if(Math.abs(parseInt(workdata.��)) >= 0){
			output += "��:" + workdata.��;
		} 

		//�X�e�[�^�X�^�O�����
		output += "</td><td class='left'>";

		if(Math.abs(parseInt(workdata.�ΐ�)) >= 0){
			output += "�ΐ�:" + workdata.�ΐ� + "<br>";
		}
		if(Math.abs(parseInt(workdata.�Ή�)) >= 0){
			output += "�Ή�:" + workdata.�Ή� + "<br>";
		}
		if(Math.abs(parseInt(workdata.�Έ�)) >= 0){
			output += "�Έ�:" + workdata.�Έ� + "<br>";
		}
		if(Math.abs(parseInt(workdata.�Ό�)) >= 0){
			output += "�Ό�:" + workdata.�Ό� + "<br>";
		}
		if(Math.abs(parseInt(workdata.�Ζ�)) >= 0){
			output += "�Ζ�:" + workdata.�Ζ� + "<br>";
		}
		if(Math.abs(parseInt(workdata.�Η�)) >= 0){
			output += "�Η�:" + workdata.�Η�;
		}

		//�����_���[�W�^�O����ďo�͂�����������
		output += "</td><td class='left'>" + workdata.������� + 
									"</td></tr>";

		$(output).appendTo("table#accessoryStatusTable tbody");
  }

  //�e�[�u����������s�֐�
  exeAfter();
}

/*****************************/
//�e�[�u����������s�֐�
/*****************************/
function exeAfter() {
  //���b�Z�[�W�N���A
  $("#mess").text("");

  //TODO
  //�\�[�g����

  //�t�B���^�֐�
  setFilter();
  $('.filter').multifilter();

}

/*****************************/
//�t�B���^�֐�
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
