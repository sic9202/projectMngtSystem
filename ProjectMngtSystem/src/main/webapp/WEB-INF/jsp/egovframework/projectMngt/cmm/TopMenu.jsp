<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>

<!DOCTYPE html>
<html lang="ko">
<!-- header start-->
<header class="header sub active">
  <script src="/js/cmm/common.js"></script>
  <div class="header__inner">
    <a href="/projectList.do" class="header__logo"></a>
    <div class="header__nav">
<!--     	<a href="">sample</a> -->
    </div>

    <div class="header__link" style="text-align: right;">
		<a href="/logout.do"><i class="xi-external-share"></i> 로그아웃</a>
    </div>
    
    <div class="show-1200 hide-default">
      <div class="header_btn">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="show-1200 hide-default">
      <div class="side__menu">
        <div class="menu__wrap">
          <ul class="menu__list">
            <li>
              <p class="menu__depth1"><a href="">sample</a></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <script>
      $(function () {
        //Header
        $(window).on('resize', gsnbLeft)
        function gsnbLeft() {
          var left = $('.header__nav').offset().left;
          $('.gsnb_nav').css({
            paddingLeft: left + 'px'
          })
        }
        gsnbLeft();

        var header = $('.header');
        var gnb = $('.header__nav > a');
        var gsnb = $('.header__gsnb')
        var gsnbNav = gsnb.find('a');
        var winPos = $(window).scrollTop();
        var headerSub = $('.header.sub');
        var headerDim = $('.header_dim');

        $(window).on('scroll', scrollHeader)

        function scrollHeader() {
          winPos = $(window).scrollTop();
          if (winPos > 0) {
            headerSub.addClass('active');
          } else {
            headerSub.removeClass('active');
          }
        }
        scrollHeader();
        gnb.on('mouseover', function () {
          header.addClass('open');

          gnb.not($(this)).removeClass('active')
          $(this).addClass('active');
          gsnb.stop().slideDown(250)

          headerDim.show().stop()
            .animate({
              opacity: 1
            }, 250)
        })


        header.on('mouseleave', function () {
          header.removeClass('open');
          headerDim.stop()
            .animate({
              opacity: 0
            }, 250, function () {
              $(this).hide();
            })

          gnb.removeClass('active')
          gsnb.stop().slideUp(250)

        })

        gsnbNav.on('mouseover', function () {
          var idx = $(this).parent().index();
          gnb.not(gnb.eq(idx)).removeClass('active')
          gnb.eq(idx).addClass('active');
        })

        var hbg = $('.header_btn');
        var sideMenu = $('.side__menu');
        var header = $('.header')

        hbg.on('click', function () {
          if (hbg.hasClass("active")) {
            hbg.addClass('not-active').removeClass("active");
            header.removeClass('open');
            sideMenu.addClass('active').show().stop()
              .animate({
                opacity: 0
              }, 250, function () {
                $(this).hide();
              })
            depth1.removeClass('active');
            $('.menu__depth2').stop().slideUp(250);
          } else {
            header.addClass('open');
            hbg.addClass('active').removeClass("not-active");
            sideMenu.show().stop()
              .animate({
                opacity: 1
              }, 250)
          }
        })
        
        var depth1 = $('.side__menu .menu__depth1');
	        depth1.on('click', function () {
	            depth1.not($(this)).removeClass('active');
	
	            $('.menu__depth2').not($(this).siblings())
	                .stop().slideUp(250);
	
	            $(this).toggleClass('active')
	                .siblings('.menu__depth2').stop()
	                .slideToggle(250)
	        })
      })
    </script>
    </div>
</header>
<!--header end-->