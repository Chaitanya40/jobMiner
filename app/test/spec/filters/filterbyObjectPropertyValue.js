'use strict';

describe('Filter: byObjectIntProp', function () {

  // load the filter's module
  beforeEach(module('JobminerApp'));

  // initialize a new instance of the filter before each test
  var byObjectIntProp;
  var byObjectStrProp;
  beforeEach(inject(function ($filter) {
    byObjectIntProp = $filter('byObjectIntProp');
    byObjectStrProp = $filter('byObjectStrProp');
  }));

  it('should return the only those jobs that are posted within this week', function () {
    var jobDetails = [{'index_col': 0, 'Source': 'Stackoverflow', 'company_logo': 'NL', 'company_name': 'PresenceLearning', 'job_link': 'http://stackoverflow.com/jobs/125364/sr-backend-engineer-data-systems-presencelearning', 'job_location': 'San Francisco, CA', 'job_position': 'Sr. Backend Engineer - Data Systems', 'tags': [], 'posted_days_ago': '0', 'timeline_container': 'Current_week'}, {'index_col': 1, 'Source': 'Stackoverflow', 'company_logo': 'NL', 'company_name': 'Sprout Social Inc.', 'job_link': 'http://stackoverflow.com/jobs/134889/senior-data-scientist-sprout-social-inc', 'job_location': 'Chicago, IL', 'job_position': 'Senior Data Scientist', 'tags': ['Java', 'Python'], 'posted_days_ago': '8', 'timeline_container': 'Current_week'}, {'index_col': 2, 'Source': 'Stackoverflow', 'company_logo': 'NL', 'company_name': 'Comcast', 'job_link': 'http://stackoverflow.com/jobs/142593/principal-engineer-data-science-comcast', 'job_location': 'Sunnyvale, CA', 'job_position': 'Principal Engineer, Data Science', 'tags': ['Python', 'Kafka', 'Storm', 'Hadoop', 'Cassandra', 'Spark', 'Scala', 'Java'], 'posted_days_ago': '3', 'timeline_container': 'Current_week'}];
    var filteredDetails = byObjectIntProp(jobDetails, 'posted_days_ago','between', [0,7]);
    expect(filteredDetails.length).toBe(2);
  });

    it('should return the only those jobs that are located in Bangalore, not Hyd', function () {
    var jobDetails = [{'index_col': 0, 'Source': 'Stackoverflow', 'company_logo': 'NL', 'company_name': 'PresenceLearning', 'job_link': 'http://stackoverflow.com/jobs/125364/sr-backend-engineer-data-systems-presencelearning', 'job_location': 'San Francisco, CA', 'job_position': 'Sr. Backend Engineer - Data Systems', 'tags': [], 'posted_days_ago': '0', 'timeline_container': 'Current_week'}, {'index_col': 1, 'Source': 'Stackoverflow', 'company_logo': 'NL', 'company_name': 'Sprout Social Inc.', 'job_link': 'http://stackoverflow.com/jobs/134889/senior-data-scientist-sprout-social-inc', 'job_location': 'Chicago, IL', 'job_position': 'Senior Data Scientist', 'tags': ['Java', 'Python'], 'posted_days_ago': '8', 'timeline_container': 'Current_week'}, {'index_col': 2, 'Source': 'Stackoverflow', 'company_logo': 'NL', 'company_name': 'Comcast', 'job_link': 'http://stackoverflow.com/jobs/142593/principal-engineer-data-science-comcast', 'job_location': 'San Francisco, CA', 'job_position': 'Principal Engineer, Data Science', 'tags': ['Python', 'Kafka', 'Storm', 'Hadoop', 'Cassandra', 'Spark', 'Scala', 'Java'], 'posted_days_ago': '3', 'timeline_container': 'Current_week'}];
    var filteredDetails = byObjectStrProp(jobDetails, 'job_location','=', ['San Francisco, CA']);
    expect(filteredDetails.length).toBe(2);
  });



});
