// function getCurrentUser(){
//   var currentUser = $('#user-list :selected').val();
//   console.log(currentUser)
// }

function getMessageHistory(){
  $.get('https://ac-project-2.firebaseio.com/messages.json', function(data, status){
    //get messages from server using setInterval
    var message = "";
    $.each(data, function(key, value){
      message += '<div class="panel-body"'
      message += 'id=' + key + '>'
      message += '<strong>' + value["user"] + '</strong><small class="pull-right">' + value["timestamp"] + '</small><br>'
      message += value["content"]
      message += '<br></div>'
    })
    $('#message-box').append(message)
    console.log("this populates UI with the list")

    getLatestMessage();
  })
  console.log("this populates the list")
}

function populateDropdownList(){
  $.get('https://ac-project-2.firebaseio.com/users.json', function(data, status){
    var dropdownList = "";
    $.each(data, function(key, value){
      dropdownList += "<option value=" + value + ">"+ value +"</option>"
    });
    $('#user-list').append(dropdownList);
  })
}

function postMessage(){
  var username = $('#user-list').val();
  var timestamp = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
  var content = $('#post-list').val();
  var thingToPost = {"user":username, "timestamp":timestamp, "content":content}
  console.log(thingToPost);
  $.post('https://ac-project-2.firebaseio.com/messages.json', JSON.stringify(thingToPost))
  // .done()
  // .fail()
}

function getLatestMessage(){
  var latestMessageId = $(".panel-body:last-child");
  console.log("this gets latest msg")
  console.log(latestMessageId.val());
  console.log($(".panel-body:last-child"));
  // https://ac-project-2.firebaseio.com/messages.json?orderBy="$key"&startAt="3"
}

$(document).ready(function(){
  populateDropdownList();
  getMessageHistory();

  $('#post-list').keypress(function(event){
    if(event.which == 13){
      postMessage();
      $('#post-list').val('');
      if(event.preventDefault) {event.preventDefault();}
    }
  })

  //getLatestMessage();

})

// To do list:
// - Take only latest after post message -> query order by, limit
