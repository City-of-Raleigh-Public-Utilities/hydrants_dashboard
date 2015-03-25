'use strict';

/**
 * @ngdoc directive
 * @name hydrantsDashboardApp.directive:login
 * @description
 * # login
 */
angular.module('hydrantsDashboard')
  .directive('loginForm', [ 'agsFactory', function (agsFactory) {
        return {
          restrict: 'E',
          templateUrl: 'views/login-form.html',
          controller: function ($scope) {
            $scope.token = '';
            $scope.loggedIn = true;
            $scope.login = function (user, password) {
              agsFactory.mapsServer.requestToken(user, password, 60).then(function (token) {
                $scope.token = token;
                $scope.loggedIn = token;
                if (token) {
                  $scope.modal.modal('hide');
                }
              });
            };
          },
          link: function (scope, element, attrs) {
            scope.modal = $('.modal', element[0])
            scope.modal.modal({keyboard: false, backdrop: 'static'});
          }
        }
      }])
