$( document ).ready(function(){
  console.log("Inside JQuery..");
  // $("#collapseCategory2").on("hide.bs.collapse", function(){
  //   $(".collapse-link").text("Show More");
  // });
  //
  // $("#collapseCategory2").on("show.bs.collapse", function(){
  //   $(".collapse-link").text("Show Less");
  // });

  $(".collapse-link").click(function(){
    $(this).text(function(i, current){
      console.log(current =="Show More");
      if($.trim(current)==="Show More")
        return "Show Less";
      else
        return "Show More";
  });
});

});
