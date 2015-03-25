'use strict';

/**
 * @ngdoc directive
 * @name hydrantsDashboardApp.directive:login
 * @description
 * # login
 */
angular.module('hydrantsDashboard')
  .directive('loginForm', [ 'agsFactory', '$location', '$cookieStore', function (agsFactory, $location, $cookieStore) {
        return {
          restrict: 'E',
          templateUrl: 'views/login-form.html',
          controller: function ($scope) {
            $scope.token = '';
            $scope.loggedIn = true;
            $scope.login = function (user, password) {
              agsFactory.login(user, password).then(function (token) {
                $scope.token = token;
                $scope.loggedIn = token;
                $cookieStore.put('token', token);
                if (token) {
                  $scope.modal.modal('hide');
                }
                // else {
                //   $location.url('/');
                // }
              },
              function(err){
                $location.url('/');
              });
            };
          },
          link: function (scope, element, attrs) {
            scope.modal = $('.modal', element[0])
            scope.modal.modal({keyboard: false, backdrop: 'static'});
          }
        }
      }]);
