'use strict';

var testapp = angular.module('test-app',
    []);



testapp.controller('projectController', ['$scope', '$filter', '$window',
    function ($scope, $filter, $window) {
        $scope.maxDate = new Date();
        $scope.added = false;
        $scope.userId = "";
        $scope.code = "";
        $scope.msg = "";
        $scope.photo = "";

        $scope.goBack = function () {
            $window.location.href = "../NEET_login.html?type=" + $window.location.search.split("?")[1].split('=')[1];
        };

        $scope.uploadFile = function (event) {

            var files = event.target.files;


            var file = files[0];

            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.photo = e.target.result;
                $scope.$apply();

            }
            reader.readAsDataURL(file);

        }

        $scope.addStudent = function () {

            if ($scope.frmNew.$valid) {

                var dob = $filter('date')($scope.student.dob, 'ddMM');
                var pwd = $filter('date')($scope.student.dob, 'ddMMyyyy');

                var user = [];

                user = JSON.parse($window.localStorage.getItem('student'));

                if (user == null) {
                    user = [];
                    user.push({
                        userId: $scope.student.fname + dob,
                        firstName: $scope.student.fname,
                        lastName: $scope.student.lname,
                        dob: $scope.student.dob,
                        userPic: $scope.photo,
                        class: $scope.student.class,
                        gender: $scope.student.gender,
                        mobile: $scope.student.mobile,
                        emailId: $scope.student.email,
                        password: btoa(pwd)
                    });

                    $window.localStorage.setItem('student', JSON.stringify(user));
                    $scope.userId = $scope.student.fname + dob;
                    $scope.code = pwd;
                    $scope.added = true;
                }
                else {

                    if (user[0].userId == $scope.student.fname + dob) {
                        $scope.msg = "This UserID already exists.";
                    }
                    else {
                        user = [];
                        user.push({
                            userId: $scope.student.fname + dob,
                            firstName: $scope.student.fname,
                            lastName: $scope.student.lname,
                            dob: $scope.student.dob,
                            userPic: $scope.photo,
                            class: $scope.student.class,
                            gender: $scope.student.gender,
                            mobile: $scope.student.mobile,
                            emailId: $scope.student.email,
                            password: btoa(pwd)
                        });

                        $window.localStorage.setItem('student', JSON.stringify(user));
                        $scope.userId = $scope.student.fname + dob;
                        $scope.code = pwd;
                        $scope.added = true;
                    }
                }

            }
        }

    }]);


testapp.controller('loginController', ['$scope', '$window',
    function ($scope, $window) {
        $scope.err = false;
        $scope.errmsg = "";

        $scope.login = function () {
            $scope.err = false;
            if ($scope.frmlogin.$valid) {

                var user = [];

                user = JSON.parse($window.localStorage.getItem('student'));

                if (user == null) {
                    $scope.err = true;
                    $scope.errmsg = "Could not find your info. Please register yourself.";
                }
                else {
                    if (user[0].userId == $scope.user.uname) {
                        if (atob(user[0].password) == $scope.user.pass){
                           
                            $window.location.href = "Quiz/Instruction.html?type=" + $window.location.search.split("?")[1].split('=')[1];
                        }
                        else {
                            $scope.err = true;
                            $scope.errmsg = "Incorrect Password";
                        }
                    }
                    else {
                        $scope.err = true;
                        $scope.errmsg = "Incorrect Username";
                    }

                }
            }

        }

    }]);

testapp.controller('profileController', ['$scope', '$window',
    function ($scope, $window) {
        var user = [];
        $scope.student = [];

        user = JSON.parse($window.localStorage.getItem('student'));

        if (user == null) {
            // Auto-populate default Guest profile so all downstream scripts/spreadsheets continue functioning perfectly
            var guestStudent = [{
                userId: "guest",
                firstName: "Guest",
                lastName: "Candidate",
                dob: "0101",
                userPic: "Quiz/img/logo.PNG",
                class: "12",
                gender: "Male",
                mobile: "9999999999",
                emailId: "guest@example.com",
                password: btoa("01012026")
            }];
            $window.localStorage.setItem('student', JSON.stringify(guestStudent));
            user = guestStudent;
        }

        $scope.student.name = user[0].firstName + " " + user[0].lastName;
        $scope.student.pic = user[0].userPic;

    }]);
