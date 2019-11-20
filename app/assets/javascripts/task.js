function toggleTask(e) {
    var itemId = $(e.target).data("id");
    console.log(itemId)
    var doneValue = Boolean($(e.target).is(':checked'));
    console.log(doneValue)
    $.post("/tasks/" + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    }).success(function(data) {
      console.log(data)
      var liHtml = taskHtml(data);
      var $li = $("#listItem-" + data.id);
      $li.replaceWith(liHtml);
     


    } );
  }
function taskHtml(task) {
    var checkedStatus = task.done ? "checked" : "";
    var liClass = task.done ? "completed" : "";
    var liElement = '<li id="listItem-' + task.id +'" class="' + liClass + '">' +
    '<div class="view"><input class="toggle" type="checkbox"' +
      " data-id='" + task.id + "'" +
      checkedStatus +
      '><label>' +
       task.title +
       '</label></div></li>';

    return liElement;
  }

$(document).ready(function() {
 
 

  $.get("/tasks").success( function( data ) {
    var htmlString = "";

    $.each(data, function(index,  task) {
      htmlString += taskHtml(task);
    });
    var ulTodos = $('.todo-list');
    ulTodos.html(htmlString);

    $(document).on("change",".toggle",toggleTask);

  });


  $('#new-form').submit(function(event) {
    event.preventDefault();
    var textbox = $('.new-todo');
    var payload = {
      task: {
        title: textbox.val()
      }
    };
    $.post("/tasks", payload).success(function(data) {
      var htmlString = taskHtml(data);
      var ulTodos = $('.todo-list');
      ulTodos.append(htmlString);
      $(document).on ("click", ".toggle", toggleTask) 
    });
  });

});