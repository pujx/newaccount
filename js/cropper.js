$(function () {
  function PictureEdit () {
    this.imageWrap = $('#J_upload_box');
    this.uploadBtnWrap = $('#J_file_wrap');
    this.preImg = $('#J_file_box_img');
    this.cropImg = null;
    this.uploadParentBtn = null;
    this.uploadBtnDirection = null;
    this.cropBtn = $('#J_crop');
    this.pics = { left: {}, right: {} };
    this.upload();
  }
  PictureEdit.prototype.upload = function () {
    var that = this;
    that.delPics();
    that.crop();
    that.getUploadBtn();//获取点击按钮
  };
  $('#J_file_wrap').on('click', function () {
    if (typeof FileReader == "undefined") {
      $.confirm({
        title: "Error!",
        content: "您的浏览器不支持 FileReader ,请换个浏览器进行上传",
        type: "red",
        typeAnimated: true,
        buttons: {
          tryAgain: {
            text: "关闭",
            btnClass: "btn-red",
          },
        }
      });
    } else {
      $('#cropperModal').modal('show');
    }
  });

  $("#J_file").on("click", function () {
    var listl_len1 = $("#J_upload_box .item").length;
    if (listl_len1 >= 4) {
      alert("最多上传4张！");
      return false;
    }
  });

  //add
  PictureEdit.prototype.crop = function () {
    var that = this;
    that.cropBtn.click(function () {
      if ($(".previewImg img").attr("src") == null) {
        $.confirm({
          title: "Error!",
          content: "图片不能为空",
          type: "orange",
          typeAnimated: true,
          buttons: {
            tryAgain: {
              text: "OK",
              btnClass: "btn-orange",
            },
          }
        });
        return false;
      } else {
        that.addPics();
        $(".previewImg").children("img").remove();
        $(".cropper-container").hide();
      }
    });
  };
  // key
  PictureEdit.prototype.getFileKey = function () {
    var str = '0123456789abcdefghijklmnopqrstuvwxyz',
      n = str.length,
      key = "",
      i = 1;
    while (i < n) {
      var a = Math.floor(n * Math.random());
      key += str.charAt(a);
      i++;
    }
    return key
  };
  // append images
  PictureEdit.prototype.addPics = function () {
    var thumb = $('<div class="item"><i class="fa fa-close"></i></div>'),
      key = this.getFileKey(),
      data = '';
    this.cropImg = this.preImg.cropper('getCroppedCanvas', {
      width: 200,
      height: 200
    });
    data = this.cropImg.toDataURL();
    thumb.css('backgroundImage', 'url(' + data + ')').attr('key', key);

    var newThumb = thumb.clone(true);

    thumb.insertBefore(this.uploadBtnWrap);

    this.uploadParentBtn.append(newThumb);

    this.pics[this.uploadBtnDirection][key] = data.split(',').pop();
  };
  // delete images
  PictureEdit.prototype.delPics = function () {
    var that = this;
    that.imageWrap.on('click', 'i', function () {
      var parent = $(this).parent('.item'),
        key = parent.attr('key');
      parent.remove();
      that.uploadParentBtn.find('div[key =' + key + ']').remove();
      delete that.pics[that.uploadBtnDirection][key];

    });
  };

  // getBtn
  PictureEdit.prototype.getUploadBtn = function () {
    var that = this;
    $('.upload-click').on('click', function () {
      that.uploadParentBtn = $(this).parent();
      if (that.uploadParentBtn.attr('id') === 'J_upload_box1') {
        that.uploadBtnDirection = 'right';
        
        $(".upload-address-ul").show();
        $(".identity-select,.identity-dropdown").hide();
        
        
      } else {
        that.uploadBtnDirection = 'left';
          $(".upload-address-ul").hide();
        	$(".identity-select,.identity-dropdown").show();
      }
      that.uploadBtnClass = J_upload_box1;
      var listl_img = that.uploadParentBtn.children('.item');
      listl_img.each(function (key, val) {
        var newVal = $(val).clone(true);
        newVal.insertBefore(that.uploadBtnWrap);
      });

    })
  }

  // base 64
  PictureEdit.prototype.getPicsData = function () {
    var arr = [];
    $.each(this.pics, function (i, n) {
      arr.push(n);
    });
    return arr.join(',');
  };

  new PictureEdit();
});

$("#cropperModal").on("hide.bs.modal", function () {
  $("#J_file").attr("type", "file");
  $(".previewImg").children("img").remove();
  $("#J_upload_box .item").remove();

});
$('#cropperModal').on('show.bs.modal', function (event) {
  $(".cropper-container").hide();
})

function selectImg (file) {
  if (!file.files || !file.files[0]) {
    return;
  }
  const reader = new FileReader()
  const that = this;
  reader.onloadend = function () {
    const result = this.result
    const img = new Image()
    img.src = result
    img.onload = function () {
      const data = compress(img, 1)
      var imgSrc = data
      imgArtwork = data
      var replaceSrc = imgSrc;
      $('#J_file_box_img').cropper('replace', replaceSrc, false);
    }
  }
  reader.readAsDataURL(file.files[0]);
  //	$("#J_file").attr("type", "text");
}

$('#J_file_box_img').cropper({
  aspectRatio: NaN,
  preview: '.previewImg',
  guides: false,
  autoCropArea: 1,
  movable: false,
  dragCrop: true,
  movable: true,
  resizable: true,
  zoomable: false,
  mouseWheelZoom: false,
  touchDragZoom: true,
  rotatable: true,
  crop: function (e) { }
});
$(".cropper-rotate-btn").on("click", function () {
  $('#J_file_box_img').cropper("rotate", 45);
});
$(".cropper-rotate-btnL").on("click", function () {
  $('#J_file_box_img').cropper("rotate", -45);
});
var flagX = true;
$(".cropper-scaleX-btn").on("click", function () {
  if (flagX) {
    $('#J_file_box_img').cropper("scaleX", -1);
    flagX = false;
  } else {
    $('#J_file_box_img').cropper("scaleX", 1);
    flagX = true;
  }
  flagX != flagX;
});

function compress (img, compressNum) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const width = img.width
  const height = img.height
  canvas.width = width
  canvas.height = height
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, width, height)
  const ndata = canvas.toDataURL('image/jpeg', compressNum)
  return ndata
}