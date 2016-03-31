$(function(){
    var $setFilter = $('#filter'),
    $setList = $('#filterlist'),
    $setFilterAll = $('.allitem');
 
    var showFade = 1000,
    showShut = 1000,
    hideFade = 1000,
    hideShut = 1000;
 
    var $setFilterBtn = $setFilter.children('a'),
    $setFilterList = $setList.children('ul').children('li'),
    $filterAllItem = $setFilterAll.attr('class');
 
    $setFilterBtn.click(function(){
        if(!($(this).hasClass('active'))){
            var filterClass = $(this).attr('class');
            $setFilterList.each(function(){
                if($(this).hasClass(filterClass)){
                    $(this).css({display:'block'});
                    $(this).find('*').stop().animate({opacity:'1'},showFade);
                    $(this).stop().animate({width:'100px'},showShut);
                } else {
                    $(this).find('*').stop().animate({opacity:'0'},hideFade);
                    $(this).stop().animate({width:'0'},hideShut,function(){
                        $(this).css({display:'none'});
                    });
                }
            });
            $setFilterBtn.removeClass('active');
            $(this).addClass('active');
        }
    });
 
    $setFilterAll.click(function(){
        $setFilterList.each(function(){
            $(this).css({display:'block'});
            $(this).find('*').stop().animate({opacity:'1'},showFade);
            $(this).stop().animate({width:'100px'},showShut);
        });
    });
    $setFilterAll.click();
});