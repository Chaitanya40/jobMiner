(function(){
  "use_strict";
  angular.module('JobmineApp').controller('FilterController', FilterController)
  .service("FilterService", FilterService);


  FilterController.$inject =['jobPromise', 'FilterService', '$stateParams']
  function FilterController(jobPromise, FilterService, $stateParams){
    var ctr1 = this;
    var complete_json = jobPromise.data.slice();
    var criteria = $stateParams.criteria;
    var searchStr = $stateParams.value;
    ctr1.jobDetailJson = [];
    FilterService.extractAllCategories(complete_json);
    FilterService.logAll();

    if(criteria.startsWith("location")){
      ctr1.jobDetailJson = FilterService.getJobsFromIdList(FilterService.getJobsByLocation(searchStr));
    }
    else if(criteria.startsWith("tag")){
      ctr1.jobDetailJson = FilterService.getJobsFromIdList(FilterService.getJobsByTag(searchStr));
    }
    else if(criteria.startsWith("company")){
      ctr1.jobDetailJson = FilterService.getJobsFromIdList(FilterService.getJobsByCompany(searchStr));
    }
  }


  function FilterService(){

    var company_category_map;
    var position_category_map;
    var location_category_map;
    var tag_category_map;
    var source_category_map;
    var id_map;

    this.logAll = function(){
      console.log(company_category_map);
      console.log(position_category_map);
      console.log(location_category_map);
      console.log(tag_category_map);
      console.log(source_category_map);
    }

    this.getFullCompanyCategoryMap = function(){
      return company_category_map;
    }

    this.getFullPositionCategoryMap = function(){
      return position_category_map;
    }

    this.getFullLocationCategoryMap = function(){
      return location_category_map;
    }

    this.getFullTagCategoryMap = function(){
      return tag_category_map;
    }

    this.getFullSourceCategoryMap = function(){
      return source_category_map;
    }

    this.getFullIdMap = function(){
      return id_map;
    }

    this.getJobsFromIdList = function(jobIdList){
      var jobsList = [];
      var job = null;
      for(var i=0; i< jobIdList.length; i++){
        job = this.getJobById(jobIdList[i]);
        if(job){
          jobsList.push(job);
        }
      }
      return jobsList;
    }

    this.getJobById = function(jobId){
      return id_map.get(jobId);
    }

    this.getJobsByCompany = function(company_name){
      var jobIdList = company_category_map.get(company_name);
    }

    this.getJobsByLocation = function(location){
      return location_category_map.get(location);
    }

    this.getJobsByPosition = function(position){
      return position_category_map.get(position);
    }

    this.getJobsByTag = function(tag){
      return tag_category_map.get(tag);
    }

    this.getJobsBySource = function(source){
      return source_category_map.get(source);
    }

    this.extractAllCategories = function(raw_json){
      id_map = new Map();
      company_category_map = new Map();
      position_category_map = new Map();
      location_category_map = new Map();
      tag_category_map = new Map();
      source_category_map = new Map();


      for(var ind=0; ind< raw_json.length; ind++){
        var jobEntry = raw_json[ind];
        var jobId = jobEntry['index_col'];
        var company_name_no_format = jobEntry['company_name'];//.replace(/\s/g, '').toLowerCase();
        var position_no_format = jobEntry['job_position'];//.replace(/\s/g, '').toLowerCase();
        var location_no_format = jobEntry['job_location'];//.split(",")[0].replace(/\s/g,'').toLowerCase();
        var tags_array = jobEntry['tags'];
        var source_no_format = jobEntry['Source'];

        id_map.set(jobId, jobEntry);

        if(company_category_map.has(company_name_no_format)){
          company_category_map.get(company_name_no_format).push(jobId);
        }
        else{
          var job_initial_arr = new Array();
          job_initial_arr.push(jobId);
          company_category_map.set(company_name_no_format, job_initial_arr);
        }

        if(position_category_map.has(position_no_format)){
          position_category_map.get(position_no_format).push(jobId);
        }
        else{
          var job_initial_arr = new Array();
          job_initial_arr.push(jobId);
          position_category_map.set(position_no_format, job_initial_arr);
        }

        if(location_category_map.has(location_no_format)){
          location_category_map.get(location_no_format).push(jobId);
        }
        else{
          var job_initial_arr = new Array();
          job_initial_arr.push(jobId);
          location_category_map.set(location_no_format, job_initial_arr);
        }

        for(var i=0; i< tags_array.length; i++){

          if(tag_category_map.has(tags_array[i])){
            tag_category_map.get(tags_array[i]).push(jobId);
          }
          else{
            var job_initial_arr = new Array();
            job_initial_arr.push(jobId);
            tag_category_map.set(tags_array[i], job_initial_arr);
          }
        }

        if(source_category_map.has(source_no_format)){
          source_category_map.get(source_no_format).push(jobId);
        }
        else{
          var job_initial_arr = new Array();
          job_initial_arr.push(jobId);
          source_category_map.set(source_no_format, job_initial_arr);
        }
      }

    }
  }

})();
