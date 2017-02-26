function getMessageHistory(){
  $.get('https://ac-project-2.firebaseio.com/messages.json', function(data, status){
    var message = "";
    $.each(data, function(key, value){
      message += '<div class="panel-body" id=' + key + ' >'
      message += '<div class=profilepic><img src=' + value["user"] + '.jpg ></div>'
      message += '<div class="message-content"><strong>' + value["user"] + '</strong><small class="pull-right">' + value["timestamp"] + '</small><br>'
      message += value["content"]
      message += '</div></div>'
    })
    $('#message-box').append(message);
  })
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

  $.post('https://ac-project-2.firebaseio.com/messages.json', JSON.stringify(thingToPost))
}

function getLatestMessage(){
  var latestMessageId = $(".panel-body:last-child").attr('id');
  // get url format: https://ac-project-2.firebaseio.com/messages.json?orderBy="$key"&startAt="3"
  $.get('https://ac-project-2.firebaseio.com/messages.json?orderBy="$key"&startAt="' + latestMessageId + '"',
    function(data, status){
      var latestMessages = "";
      $.each(data, function(key, value){
        if(key == latestMessageId){
          return true;
        }else{
          latestMessages += '<div class="panel-body" id=' + key + ' >'
          latestMessages += '<div class=profilepic><img src=' + value["user"] + '.jpg ></div>'
          latestMessages += '<div class="message-content"><strong>' + value["user"] + '</strong><small class="pull-right">' + value["timestamp"] + '</small><br>'
          latestMessages += value["content"]
          latestMessages += '</div></div>'
        }
      })
      $('#' + latestMessageId).after(latestMessages);

      // Problem: to scroll only when there are new messages, not scroll very 2 secs
      var heightToScroll = $('#message-box')[0].scrollHeight;
      $('#message-box').scrollTop(heightToScroll);

      console.log("retrived the latest messages")

    }).done(
      // On success of getting latest messages, sets timeout of 2 secs to retrieve new messages again.
      // setTimeout(function(){
      //   getLatestMessage()
      // }, 2000)
    )
}

$(document).ready(function(){
  populateDropdownList();
  getMessageHistory();

  // Posts message on keypress enter
  $('#post-list').keypress(function(event){
    if(event.which == 13){
      if($('#post-list').val() == ""){
        console.log("empty content, nothing posted")
      }else if($('#user-list').val() == ""){
        console.log("no user selected, nothing posted")
        alert("Please select a user first")
      }else{
        postMessage();
        $('#post-list').val('');
        if(event.preventDefault) {event.preventDefault();}
      }
    }
  })

  // Gets the latest message after 3 secs.
  // setTimeout(function(){
  //   getLatestMessage()
  // }, 3000)

})

// Possible to do:
// - add new users and their profile pics how?? 
// - sidebar with multiple chatrooms??
