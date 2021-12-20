/* eslint-disable */
import WorkoutService from './workoutService';
import * as MockDate from 'mockdate'

function testF({today, weekNumber, workoutDayNumber, expected}) {
	// Mock current date
	MockDate.set(today);

	const service = new WorkoutService();
	const result = service.getWorkoutDateFromTemplate(workoutDayNumber, weekNumber);
	expect(result).toBe(expected);
}

describe('Calculate workout dates', () => {
	test.each`
	  name |  today | weekNumber | workoutDayNumber | expected
	  ${'week 1, day 1'} | ${'2019-12-20'} | ${1} | ${1} | ${'2019-12-23'}
	  ${'week 1, day 2'} | ${'2019-12-20'} | ${1} | ${2} | ${'2019-12-24'}
	  ${'week 1, day 3'} | ${'2019-12-20'} | ${1} | ${3} | ${'2019-12-25'}
	  ${'week 1, day 4'} | ${'2019-12-20'} | ${1} | ${4} | ${'2019-12-26'}
	  ${'week 1, day 5'} | ${'2019-12-20'} | ${1} | ${5} | ${'2019-12-27'}
	  ${'week 1, day 6'} | ${'2019-12-20'} | ${1} | ${6} | ${'2019-12-28'}
	  ${'week 1, day 7'} | ${'2019-12-20'} | ${1} | ${7} | ${'2019-12-29'}
	  ${'week 2, day 1'} | ${'2019-12-20'} | ${2} | ${1} | ${'2019-12-30'}
	  ${'week 2, day 2'} | ${'2019-12-20'} | ${2} | ${2} | ${'2019-12-31'}
	  ${'week 2, day 3'} | ${'2019-12-20'} | ${2} | ${3} | ${'2020-01-01'}
	  ${'week 2, day 4'} | ${'2019-12-20'} | ${2} | ${4} | ${'2020-01-02'}
	  ${'week 2, day 5'} | ${'2019-12-20'} | ${2} | ${5} | ${'2020-01-03'}
	  ${'week 2, day 6'} | ${'2019-12-20'} | ${2} | ${6} | ${'2020-01-04'}
	  ${'week 2, day 7'} | ${'2019-12-20'} | ${2} | ${7} | ${'2020-01-05'}
	`('testing $name', testF);

	test.each`
	  name |  today | weekNumber | workoutDayNumber | expected
	  ${'Monday'} | ${'2019-12-16'} | ${1} | ${1} | ${'2019-12-23'}
	  ${'Tuesday'} | ${'2019-12-17'} | ${1} | ${1} | ${'2019-12-23'}
	  ${'Wednesday'} | ${'2019-12-18'} | ${1} | ${1} | ${'2019-12-23'}
	  ${'Thursday'} | ${'2019-12-19'} | ${1} | ${1} | ${'2019-12-23'}
	  ${'Friday'} | ${'2019-12-20'} | ${1} | ${1} | ${'2019-12-23'}
	  ${'Saturday'} | ${'2019-12-21'} | ${1} | ${1} | ${'2019-12-23'}
	  ${'Sunday'} | ${'2019-12-22'} | ${1} | ${1} | ${'2019-12-23'}
	`('first week first day start from $name', testF);

	test.each`
	  name |  today | weekNumber | workoutDayNumber | expected
	  ${'Monday'} | ${'2019-12-16'} | ${1} | ${7} | ${'2019-12-29'}
	  ${'Tuesday'} | ${'2019-12-17'} | ${1} | ${7} | ${'2019-12-29'}
	  ${'Wednesday'} | ${'2019-12-18'} | ${1} | ${7} | ${'2019-12-29'}
	  ${'Thursday'} | ${'2019-12-19'} | ${1} | ${7} | ${'2019-12-29'}
	  ${'Friday'} | ${'2019-12-20'} | ${1} | ${7} | ${'2019-12-29'}
	  ${'Saturday'} | ${'2019-12-21'} | ${1} | ${7} | ${'2019-12-29'}
	  ${'Sunday'} | ${'2019-12-22'} | ${1} | ${7} | ${'2019-12-29'}
	`('first week last day start from $name', testF);


	test.each`
	  name |  today | weekNumber | workoutDayNumber | expected
	  ${'Monday'} | ${'2019-12-16'} | ${2} | ${1} | ${'2019-12-30'}
	  ${'Tuesday'} | ${'2019-12-17'} | ${2} | ${1} | ${'2019-12-30'}
	  ${'Wednesday'} | ${'2019-12-18'} | ${2} | ${1} | ${'2019-12-30'}
	  ${'Thursday'} | ${'2019-12-19'} | ${2} | ${1} | ${'2019-12-30'}
	  ${'Friday'} | ${'2019-12-20'} | ${2} | ${1} | ${'2019-12-30'}
	  ${'Saturday'} | ${'2019-12-21'} | ${2} | ${1} | ${'2019-12-30'}
	  ${'Sunday'} | ${'2019-12-22'} | ${2} | ${1} | ${'2019-12-30'}
	`('second week first day start from $name', testF);
});
