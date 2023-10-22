let scrollTop = $(window).scrollTop();

$(window).scroll(function(evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function() {
    // анимация меню
    $('.menu').click(function(e){
        e.preventDefault();
        ($('.menu').hasClass('active') === true) ? $('.menu').removeClass('active') : $('.menu').addClass('active');

        $('.header').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.menu-links-wrapper, .menu');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.header, .menu').removeClass('active');
            }
        });
    });
    
    // якоря для ссылок
    $('.anchor[href^="#"]').click(function () {
        $('.header').removeClass('active'); 
        $('.menu').removeClass('active');

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    // появление меню при скролле
    if ($('.section-header').length) {
        let stickyNavTop = $('.section-header').next().offset().top;
        let stickyNav = function() {
            if (scrollTop > stickyNavTop) {
                $('.header').addClass('fixed');
            } else {
                $('.header').removeClass('fixed');
            }
        };
        stickyNav();
        $(window).scroll(function() {
            stickyNav();
        });
    } else {
        $('.header').addClass('fixed');
    }

    // маски
    if ($('.phone-mask').length) {
        $('.phone-mask').inputmask({
            regex: "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$",
            "clearIncomplete": true
        });
    }

    // show password
    $('.show_password').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('showed')) {
            $(this).parent().find('.input_text').attr('type', 'password');
            $(this).removeClass('showed')
        } else {
            $(this).parent().find('.input_text').attr('type', 'text');
            $(this).addClass('showed')
        }
        return false;
    });

    // pincode
    function pinCode() {
        $('.pincode').keydown(function(e){
            $(this).val('');
        });
         
        $('.pincode').keyup(function(e){
            var $wrap = $(this).closest('.call-wrapper');
            var $inputs = $wrap.find('input');   
            var val = $(this).val();
            
            if(val == val.replace(/[0-9]/, '')) {
                $(this).val('');
                if(e.keyCode != 8) {
                    return false;
                }
            }

            if (e.keyCode == 8) {
                if($(this).parent().index() > 0) {
                    $inputs.eq($inputs.index(this) - 1).focus();
                }
            } else {
                if($(this).parent().index() >= 0) {
                    $inputs.eq($inputs.index(this) + 1).focus();
                }
            }
        });
    }
    pinCode();

    // кнопки +-
    $('body').on('click', '.btn-number', function(e) {
        var type = $(this).attr('data-type');
        var field = $(this).attr('data-field');
        var input = $(this).parent().find('input[name ='+field+']');
        var min = input.attr('min');
        var min_count = input.attr('min-count');
        var max = input.attr('max');
        min = parseInt(min);
        min_count = parseInt(min_count);
        max = parseInt(max);
        var currentVal;
        var value = input.val();
        if (type == 'minus') {
            if (value > min) {
                if (value <= min_count) {
                    currentVal = parseInt(value) - min_count;
                    input.val(currentVal).change();
                } else {
                    currentVal = parseInt(value) - 1;
                    input.val(currentVal).change();
                }
            }
        }
        if (type == 'plus') {
            if (value < max) {
                if (value < min_count) {
                    currentVal = parseInt(value) + min_count;
                    input.val(currentVal).change();
                } else {
                    currentVal = parseInt(value) + 1;
                    input.val(currentVal).change();
                }
            }
        }

        let tooltip = $(this).parents('.buy-tickets-count-info').find('.tooltip-input-count');
        if ($(this).hasClass('btn-plus disabled-btn')) {
            tooltip.addClass('show').text('Нельзя добавить больше билетов в заказ');
            setTimeout(function() {
                tooltip.removeClass('show');
            }, 2000);
        }
    });
    $('body').on('change keyup', '.input-number', function() {
        var min = $(this).attr('min');
        var max = $(this).attr('max');
        var val = $(this).val();
        var name = $(this).parent().find('.input-number').attr('name');
        if (val == min) {
            $(this).parent().find(".btn-number[data-type='minus'][data-field='" + name + "']").attr('disabled', 'true');
        } else $(this).parent().find(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
        if (val == max) {
            $(this).parent().find(".btn-number[data-type='plus'][data-field='" + name + "']").addClass('disabled-btn');
        } else $(this).parent().find(".btn-number[data-type='plus'][data-field='" + name + "']").removeClass('disabled-btn');
    });
});