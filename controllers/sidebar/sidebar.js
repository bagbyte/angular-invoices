'use strict';

angular.module('businessManager.sidebar', [])
    .directive('sidebar', function () {
        return {
            restrict: 'E',
            templateUrl: '/controllers/sidebar/sidebar.html',
            controller: 'sidebarCtrl'
        }
    })
    .controller('sidebarCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(path) {
            var currentPath = $scope.currentPath();
            if (path == '/')
                return currentPath == '/';
            return currentPath.indexOf(path) == 0;
        };

        $scope.currentPath = function() {
            var currentPath = $location.path().split('#')[0];
            if (currentPath.indexOf('?') !== -1) {
                currentPath = currentPath.split('?')[0];
            }
            return currentPath;
        };

        var $BODY = $('body'),
            $MENU_TOGGLE = $('#menu_toggle'),
            $SIDEBAR_MENU = $('#sidebar-menu'),
            $SIDEBAR_FOOTER = $('.sidebar-footer'),
            $LEFT_COL = $('.left_col'),
            $RIGHT_COL = $('.right_col'),
            $NAV_MENU = $('.nav_menu'),
            $FOOTER = $('footer');


        var setContentHeight = function () {
            // reset height
            $RIGHT_COL.css('min-height', $(window).height());

            var bodyHeight = $BODY.height(),
                leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
                contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

            // normalize content
            contentHeight -= $NAV_MENU.height() + $FOOTER.height();

            $RIGHT_COL.css('min-height', contentHeight);
        };

        $SIDEBAR_MENU.find('a').on('click', function(ev) {
            var $li = $(this).parent();

            if ($li.is('.active')) {
                $li.removeClass('active');
                $('ul:first', $li).slideUp(function() {
                    setContentHeight();
                });
            } else {
                // prevent closing menu if we are on child menu
                if (!$li.parent().is('.child_menu')) {
                    $SIDEBAR_MENU.find('li').removeClass('active');
                    $SIDEBAR_MENU.find('li ul').slideUp();
                }

                $li.addClass('active');

                $('ul:first', $li).slideDown(function() {
                    setContentHeight();
                });
            }
        });

        // toggle small or large menu
        $MENU_TOGGLE.on('click', function() {
            if ($BODY.hasClass('nav-md')) {
                $BODY.removeClass('nav-md').addClass('nav-sm');

                if ($SIDEBAR_MENU.find('li').hasClass('active')) {
                    $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
                }
            } else {
                $BODY.removeClass('nav-sm').addClass('nav-md');

                if ($SIDEBAR_MENU.find('li').hasClass('active-sm')) {
                    $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
                }
            }

            setContentHeight();
        });

        // check active menu
        //$SIDEBAR_MENU.find('a[href="#' + $scope.currentPath() + '"]').parent('li').addClass('current-page');

        $SIDEBAR_MENU.find('a[href="#' + $scope.currentPath() + '"]').parent('li').addClass('current-page').parents('ul').slideDown(function() {
            setContentHeight();
        }).parent().addClass('active');

        // fixed sidebar
        if ($.fn.mCustomScrollbar) {
            $('.menu_fixed').mCustomScrollbar({
                autoHideScrollbar: true,
                theme: 'minimal',
                mouseWheel:{ preventDefault: true }
            });
        }

    }]);