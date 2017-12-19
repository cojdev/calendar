/**
 * 
 */

var cal = new Calendar();
var date = new Date();

/**
 * Calendar "class"
 */
function Calendar () {
    // List of month names
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // List of weekday names
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}

var taskList = [
    {
        text: "Buy christmas presents",
        checked: false,
        starred: true,
        id: 1,
        created: "20-12-2017"
    },
    {
        text: "Send invoice",
        checked: false,
        starred: true,
        id: 2,
        created: "20-12-2017"
    },
    {
        text: "Buy christmas presents",
        checked: false,
        starred: true,
        id: 1,
        created: "20-12-2017"
    },
    {
        text: "Send invoice",
        checked: false,
        starred: true,
        id: 2,
        created: "20-12-2017"
    },
    {
        text: "Do homework",
        checked: true,
        starred: false,
        id: 3,
        created: "22-12-2017"
    },
    {
        text: "Tickets go on sale",
        checked: true,
        starred: false,
        id: 3,
        created: "20-11-2017"
    },
    {
        text: "Go shopping",
        checked: false,
        starred: false,
        id: 4,
        created: "23-12-2017"
    },
    {
        text: "Make To-do List",
        checked: true,
        starred: true,
        id: 5,
        created: "01-12-2017"
    },
    {
        text: "Christmas Day",
        checked: true,
        starred: true,
        id: 5,
        created: "25-12-2017"
    },
    {
        text: "Boxing Day",
        checked: true,
        starred: true,
        id: 5,
        created: "26-12-2017"
    }
];

/**
 * Converts date from a 'dd-mm-yyyy' string to an object {day: dd, month: mm, year: yyyy}
 * @param {string} str 
 */
function _parseDate (str) {
    var arr = str.split('-');
    return {
        day: parseInt(arr[0]),
        // convert month to 0-11 format
        month: parseInt(arr[1]) - 1,
        year: parseInt(arr[2])
    };
}

function _ordinalSuffix(num) {
    var list = ['st', 'nd', 'rd', 'th'];
    if (num % 100 < 10 || num % 100 > 13) {
        switch (num % 10) {
            case 1:
                return list[0];
                break;
            case 2:
                return list[1];
                break;
            case 3:
                return list[2];
                break;
            default:
                return list[3];
                break;
        }
    }
    else {
        return list[3];
    }
    
    var output;
    return
}

function _formatDate (obj) {
    var dateObject = new Date(obj.year, obj.month, obj.day);
    return cal.weekdays[dateObject.getDay()] + " " + obj.day + _ordinalSuffix(obj.day) + " " + cal.months[obj.month] + ", " + obj.year;
}

/**
 * Main Vue instance
 */
var todo = new Vue({

    el: '#app',

    data: {
        weekdayNames: cal.weekdays.map(function (a) {
            return a.slice(0,3);
        }),
        monthNames: cal.months,
        currentYear: date.getFullYear(),
        currentMonth: date.getMonth(),
        today: date.getDate(),
        activeYear: date.getFullYear(),
        activeMonth: date.getMonth(),
        currentList: [],
        dayList: [1,2,3],
        state: "split",
        selected: {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }
    },

    watch: {
        selected: {
            handler: function () {
                var self = this;
                self.currentList = taskList.filter(function (a) {
                    //console.log(self.selected.day);
                    return _parseDate(a.created).day === self.selected.day &&
                        _parseDate(a.created).month === self.selected.month &&
                        _parseDate(a.created).year === self.selected.year;
                })
            },
            deep: true
        }
    },

    computed: {
        // Returns a matrix of days and weeks of the month [[1,2,3,...],[8,9,10,...],...]
        getWeeks: function () {
            // Empty array
            var weeks = [];
            // Date object of the first day of the active month
            var dateObject = new Date(this.activeYear, this.activeMonth, 1);
            // 0-6 numerical value of the first day of the month
            var firstWeekday = dateObject.getDay();
            // Get the month length dynamically so leap years are accounted for
            var monthLength = new Date(this.activeYear, this.activeMonth + 1, 0).getDate();
            // Set current day to 1 each time this function is called
            var currentDay = 1;

            // Loop through weeks in a month
            for (var i = 0; i < 6 && currentDay < monthLength + 1; i++) {
                weeks.push([]);
                if (i === 0) {
                    // Loop through days in the first week of the month
                    for (var j = 0; j < 7; j++) {
                        if (j < firstWeekday) {
                            weeks[i].push('');
                        }
                        else {
                            weeks[i].push({
                                day: currentDay,
                                month: this.activeMonth,
                                year: this.activeYear,
                            });
                            var elem = weeks[i][weeks[i].length - 1];
                            elem.todos = this.getTodos(elem);

                            currentDay++;
                        }
                    }
                }
                else {
                    // Loop through days in each other week
                    for (var j = 0; j < 7; j++) {
                        if (currentDay < monthLength + 1) {
                            weeks[i].push({
                                day: currentDay,
                                month: this.activeMonth,
                                year: this.activeYear
                            });
                            var elem = weeks[i][weeks[i].length - 1];
                            elem.todos = this.getTodos(elem);

                            console.log(elem);
                            currentDay++;
                        }
                        else {
                            weeks[i].push('');
                        }
                        
                    }
                }
            }

            return weeks;
        }
    },

    created: function () {
        this.activeMonth = this.currentMonth;
    },

    methods: {
        isState: function (str) {
            return this.state === str;
        },

        toggleState: function () {
            this.state = this.state === "split" ? "full" : "split";
        },

        getTodos: function (obj) {
            return taskList.filter(function (a) {
                return _parseDate(a.created).day === obj.day &&
                    _parseDate(a.created).month === obj.month &&
                    _parseDate(a.created).year === obj.year;
            });
        },

        selectDay: function (elem) {
            if (elem > 0) {
                this.selected.day = elem;
                this.selected.month = this.activeMonth;
                this.selected.year = this.activeYear;
            }
        },

        deselect: function () {
            for (var key in this.selected) {
                this.selected[key] = false;
            }
        },

        isToday: function (value) {
            return this.today === value && this.activeMonth === this.currentMonth && this.activeYear === this.currentYear;
        },

        isSelected: function (value) {
            return this.selected.day === value && this.activeMonth === this.selected.month && this.activeYear === this.selected.year;
        },

        formatDate: function (obj) {
            return _formatDate(obj);
        },

        prevMonth: function () {
            if (this.activeMonth === 0) {
                this.activeMonth = 11;
                this.activeYear--;
            }
            else {
                this.activeMonth--;
            }
        },

        nextMonth: function () {
            if (this.activeMonth === 11) {
                this.activeMonth = 0;
                this.activeYear++;
            }
            else {
                this.activeMonth++;
            }
        },

        prevYear: function () {
            this.activeYear--;
        },

        nextYear: function () {
            this.activeYear++;
        }
    }
    
});

