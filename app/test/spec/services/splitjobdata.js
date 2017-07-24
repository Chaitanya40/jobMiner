'use strict';

describe('Service: SplitJobDataService', function () {

  // load the service's module
  beforeEach(module('JobminerApp'));

  // instantiate service
  var splitJobData, byObjectIntProp, byObjectStrProp;

  var json_sample = [
   {
      "index_col":0,
      "Source":"Stackoverflow",
      "company_logo":"NL",
      "company_name":"PresenceLearning",
      "job_link":"http://stackoverflow.com/jobs/125364/sr-backend-engineer-data-systems-presencelearning",
      "job_location":"San Francisco, CA",
      "job_position":"Sr. Backend Engineer - Data Systems",
      "tags":[

      ],
      "posted_days_ago":"Today",
      "timeline_container":"Current_week"
   },
   {
      "index_col":1,
      "Source":"Stackoverflow",
      "company_logo":"NL",
      "company_name":"Sprout Social Inc.",
      "job_link":"http://stackoverflow.com/jobs/134889/senior-data-scientist-sprout-social-inc",
      "job_location":"Chicago, IL",
      "job_position":"Senior Data Scientist",
      "tags":[
         "Java",
         "Python"
      ],
      "posted_days_ago":"Today",
      "timeline_container":"Current_week"
   },
   {
      "index_col":2,
      "Source":"Stackoverflow",
      "company_logo":"NL",
      "company_name":"Comcast",
      "job_link":"http://stackoverflow.com/jobs/142593/principal-engineer-data-science-comcast",
      "job_location":"Sunnyvale, CA",
      "job_position":"Principal Engineer, Data Science",
      "tags":[
         "Python",
         "Kafka",
         "Storm",
         "Hadoop",
         "Cassandra",
         "Spark",
         "Scala",
         "Java"
      ],
      "posted_days_ago":"Today",
      "timeline_container":"Current_week"
   },
   {
      "index_col":3,
      "Source":"Stackoverflow",
      "company_logo":"NL",
      "company_name":"Comcast",
      "job_link":"http://stackoverflow.com/jobs/142594/director-software-engineering-comcast",
      "job_location":"Sunnyvale, CA",
      "job_position":"Director, Software Engineering",
      "tags":[
         "NLP",
         "AI",
         "AWS",
         "Python",
         "Kafka",
         "Azure",
         "Hadoop",
         "Spark",
         "R",
         "Scala",
         "Tableau",
         "H2O",
         "Theano"
      ],
      "posted_days_ago":"Today",
      "timeline_container":"Current_week"
   },
   {
      "index_col":4,
      "Source":"Stackoverflow",
      "company_logo":"NL",
      "company_name":"Ocono",
      "job_link":"http://stackoverflow.com/jobs/134940/backend-engineer-python-ocono",
      "job_location":"Berlin, Germany",
      "job_position":"Backend Engineer (Python)",
      "tags":[

      ],
      "posted_days_ago":"Today",
      "timeline_container":"Current_week"
   },
   {
      "index_col":5,
      "Source":"Kaggle",
      "company_logo":"https://kaggle2.blob.core.windows.net/jobs-board/posts/17808/company_logo.png",
      "company_name":"Comcast",
      "job_link":"https://www.kaggle.com/jobs/17808/fendt-eine-marke-der-agco-gmbh-manager-data-analytics-m-f-in-marktoberdorf",
      "job_location":"Marktoberdorf/Allg\u00e4u near Munich",
      "job_position":"Manager Data Analytics (m/f) in Marktoberdorf/Allg\u00e4u...",
      "tags":[
         "Marketing",
         "Analytics"
      ],
      "posted_days_ago":"Yesterday",
      "timeline_container":"Current_week"
   }
];
  beforeEach(inject(function (_SplitJobDataService_, $filter) {
    splitJobData = _SplitJobDataService_;
    byObjectIntProp = $filter('byObjectIntProp');
    byObjectStrProp = $filter('byObjectStrProp');
  }));

  it('should return byObjectIntProp when getFilterByType is called  with days', function () {
    var getFilterByType = splitJobData.getFilterByType;
    expect(getFilterByType('posted_days_ago')).toBe('byObjectIntProp');
  });

  it('should return byObjectStrProp when getFilterByType is called  with company', function () {
    var getFilterByType = splitJobData.getFilterByType;
    expect(getFilterByType('company_name')).toBe('byObjectStrProp');
  });

  it('should return shortlist when getFilterByType is called  with shortlist', function () {
    var getFilterByType = splitJobData.getFilterByType;
    expect(getFilterByType('shortlist')).toBe('shortlist');
  });

  it('should return shortlist when getFilterByType is called  with shortlist', function () {
    var getFilterByType = splitJobData.getFilterByType;
    expect(getFilterByType('shortlist')).toBe('shortlist');
    // expect(!!splitJobData).toBe(true);
  });

  it('should return byObjectIntProp str when param contains days with value and others with null', function () {
    var getFiltersForParams = splitJobData.getFiltersForParams;
    var params = { property: 'posted_days_ago', operator: 'between', values: [0, 7] };
    var actual = getFiltersForParams(params);
    expect(getFiltersForParams(params)).toBe('byObjectIntProp');
  });

  it('should return byObjectStrProp str when param contains location with value and others with null', function () {
    var getFiltersForParams = splitJobData.getFiltersForParams;
    var params = { property: 'location', operator: '=', values: ['Hyderabad', 'Bangalore'] };
    var actual = getFiltersForParams(params);
    expect(getFiltersForParams(params)).toBe('byObjectStrProp');
  });

  it('should return shortlist str when param contains shortlist with value and others with null', function () {
    var getFiltersForParams = splitJobData.getFiltersForParams;
    var params = { property: 'shortlist', operator: '=', values: [] };
    var actual = getFiltersForParams(params);
    expect(getFiltersForParams(params)).toBe('shortlist');
  });

  it('should return five entries from 6 jobs in the json filtered by source', function(){
    var getJobsToDisplay = splitJobData.getJobsToDisplay;
    var params = {Source:{property:'Source', operator:'=', values:['Stackoverflow']}};
    var actual = getJobsToDisplay(json_sample,  params);
    expect(actual.length).toBe(5);
  });

  it('should return two entries from 6 jobs in the json filtered by source and name', function(){
    var getJobsToDisplay = splitJobData.getJobsToDisplay;
    var params = {Source:{property:'Source', operator:'=', values:['Stackoverflow']}, company:{property:'company_name', operator:'=', values:['Comcast']}};
    var actual = getJobsToDisplay(json_sample,  params);
    expect(actual.length).toBe(2);
  });

  it('should return four entries from 6 jobs in the json filtered by source and name', function(){
    var getJobsToDisplay = splitJobData.getJobsToDisplay;
    var params = { company:{property:'company_name', operator:'=', values:['Comcast', 'Ocono']}};
    var actual = getJobsToDisplay(json_sample,  params);
    expect(actual.length).toBe(4);
  });

  it('should return four entries from 6 jobs in the json filtered by source and name', function(){
    var getJobsToDisplay = splitJobData.getJobsToDisplay;
    var params = { tags:{property:'tags', operator:'in', values:['python', 'Kafka']}};
    var actual = getJobsToDisplay(json_sample,  params);
    expect(actual.length).toBe(3);
  });





});
