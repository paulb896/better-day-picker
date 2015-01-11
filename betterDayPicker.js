(function() {
  var module = this;

  module.directive('betterDayPicker', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'better-day-picker.html',
      scope:{
        selectedDate: "="
      },
      bindToController: true,
      controllerAs: 'betterDayPicker',
      controller: function($scope) {
        var betterDayPicker = this;
        var addDayOfWeekHeadings = function() {
          betterDayPicker.days.push({name:"S"});
          betterDayPicker.days.push({name:"M"});
          betterDayPicker.days.push({name:"T"});
          betterDayPicker.days.push({name:"W"});
          betterDayPicker.days.push({name:"T"});
          betterDayPicker.days.push({name:"F"});
          betterDayPicker.days.push({name:"S"});
        };

        var addSpacersForDayOfMonth = function(monthNumber) {
          var selectedDate = new Date(betterDayPicker.selectedDate.getFullYear(), monthNumber-1, 1, 0);
          for(var j = 1; j <= selectedDate.getDay(); j++) {
              betterDayPicker.days.push({name:"'"});
          }
        };

        var addDaysForMonth = function(daysAmount) {
          for(var i = 1; i <= daysAmount; i++) {
              betterDayPicker.days.push({name:i});
          }
        };

        var getMonths = function() {
           return [
            {name:"J", fullName:"January", monthNumber:1},
            {name:"F", fullName:"February",monthNumber:2},
            {name:"M", fullName:"March",monthNumber:3},
            {name:"A", fullName:"April",monthNumber:4},
            {name:"M", fullName:"May",monthNumber:5},
            {name:"J", fullName:"June",monthNumber:6},
            {name:"J", fullName:"July",monthNumber:7},
            {name:"A", fullName:"August",monthNumber:8},
            {name:"S", fullName:"September",monthNumber:9},
            {name:"O", fullName:"October",monthNumber:10},
            {name:"N", fullName:"November",monthNumber:11},
            {name: "D", fullName:"December",monthNumber:12}
          ];
        };

        betterDayPicker.setMonth = function(monthNumber) {
          betterDayPicker.month = monthNumber;
          betterDayPicker.newSelectedDate = new Date(betterDayPicker.selectedDate.getFullYear(), monthNumber, betterDayPicker.selectedDate.getHours(), betterDayPicker.selectedDate.getMinutes());

          betterDayPicker.days = [];
          var daysAmount = new Date(betterDayPicker.selectedDate.getFullYear(), monthNumber, 0).getDate();
          if (daysAmount < 28) {
              var currentDate = new Date(betterDayPicker.selectedDate);
              daysAmount = new Date(currentDate.getYear(), currentDate.getMonth()-1, 0).getDate();
          }
          addDayOfWeekHeadings();
          addSpacersForDayOfMonth(monthNumber);
          addDaysForMonth(daysAmount);


          betterDayPicker.newSelectedDate.setDate(betterDayPicker.selectedDate.getDate());
          betterDayPicker.selectedDate = betterDayPicker.newSelectedDate;
          betterDayPicker.selectedDate.setMonth(monthNumber-1);
        };

        betterDayPicker.updateSelectedDay = function(day) {
          day = parseInt(day);
          if (!day) {
              return;
          }
          betterDayPicker.day = day;
          var newSelectedDate = new Date(betterDayPicker.selectedDate);
          newSelectedDate.setDate(day);
          betterDayPicker.selectedDate = newSelectedDate;
        };

        betterDayPicker.initializeDate = function() {
          betterDayPicker.currentDate = new Date();

          var currentTime = new Date();
          if (!betterDayPicker.selectedDate) {
              var currentMonth = currentTime.getMonth();
              betterDayPicker.selectedDate = new Date();
              betterDayPicker.setMonth(currentTime.getMonth()+1);
          } else {
              var dateNew = new Date(betterDayPicker.selectedDate);
              betterDayPicker.setMonth(dateNew.getMonth()+1);
          }

          betterDayPicker.months = getMonths();
        };
      },
      link: function(scope, element, attrs, betterTimePicker) {
        betterTimePicker.initializeDate();
      }
    }
  })
}).call(angular.module('betterDayPicker', []));
