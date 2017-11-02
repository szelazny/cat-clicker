// Whole-script strict mode syntax
"use strict";


var Model = {

    "visible": "false",

    cats: [
      {"name": "sasha",       "numClicks": 0},
      {"name": "seghen",      "numClicks": 0},
      {"name": "samson",      "numClicks": 0},
      {"name": "kitten",      "numClicks": 0},
      {"name": "pang",        "numClicks": 0}
    ],

  GetAllCats: function(){
    return Model.cats;
  },
  GetCatName: function(index){
    return Model.cats[index].name;
  },
  GetNumClicks: function(index){
    return Model.cats[index].numClicks;
  },
  IncrementNumClicks: function(index){
    Model.cats[index].numClicks++;
  },
  FindIndex: function(name){
    var cat;
    for (cat in Model.cats){
      if (Model.cats[cat].name == name){
        return cat;
      }
    }
  }
};

$(document).ready(function(){
  Controller.Init();
});

var Controller = {
  Init: function(){
    CatListView.render();
    CatDetailView.render(0, Model.GetCatName(0), Model.GetNumClicks(0));

    //use jQuery selector to loop through each element of the cat list
    $("#cat-list li").each(function (index) {
      //set a click handler for each name in the list
      $(this).click(function(e){
        var text = $(this).text();

        //grab substring before first space
        var name = text.substr(0, text.indexOf(' ')); 

        CatDetailView.render(index, name, Model.GetNumClicks(index));

        // Using jQuery, check for any active list items
        if($(".active").length){
          // clear any active list items
          $(".active").removeClass("active");
        }

        $("li").eq(index).addClass("active");
      });

    });

    //Set Click handler for cat image
    $("#cat-img").click(function(e) {
      var name = $("#cat-name").text();
      var index = Model.FindIndex(name);

      Model.IncrementNumClicks(index);
      CatDetailView.UpdateClicks(Model.GetNumClicks(index), index);

    });
    
  },

  GetCats: function(){
    return Model.GetAllCats();
  }
}

var CatListView = {
  render: function(){
    var cats = Controller.GetCats();
    var cat;
    for (cat in cats){
      var catLi = "<li id=\"cat-list-item\" >" +
                  cats[cat].name + "<span class=\"badge\"> 0</span></li>";
      $("#cat-list").append(catLi);
      
      //set bootstrap active class for first cat in list
      if (0 == cat){
        $("li").eq(cat).addClass("active");
      }
    }
    this.setCss();
  },
  setCss: function(){
    var cssWidth = parseInt($(".container").css("width"));
    var groupClass = "list-group";
    var itemClass = "list-group-item";

    $("ul").removeClass();
    
    /*
     * Width of break point is 750 see:
     * http://getbootstrap.com/css/#grid-options
     */
    if (cssWidth <= 750){
      groupClass = "list-group-horizontal";
      itemClass += " item-horizontal";
      $("ul").addClass("list-inline");
      $("li").addClass(itemClass);
    } else {
      $("li").addClass(itemClass);
      $("li").removeClass("item-horizontal");
    }
    $("#cat-group").removeClass().addClass(groupClass);
  }
}

$(window).resize(function() {
  CatListView.setCss();
});

var CatDetailView = {
  render: function(Index,Name,Clicks){
        var fileName = "img/" + Name + ".jpg";
        $("#cat-name").text(Name);
        $("#cat-img").attr("src",fileName);
        CatDetailView.UpdateClicks(Clicks);

        //special case
        if ("pang" == Name){
          $("#cat-img").addClass("img-circle");
        } else {
          $("#cat-img").removeClass("img-circle");
        }
  },
  UpdateClicks: function(NumClicks, Index){
    $("li").eq(Index).children().text(" " + NumClicks);

  }
}
