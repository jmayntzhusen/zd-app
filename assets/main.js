$(function() {
    var client = ZAFClient.init();
    $('.conditional').conditionize();
});
  
//   function requestUserInfo(client, id) {
//     var settings = {
//       url: '/api/v2/users/' + id + '.json',
//       type:'GET',
//       dataType: 'json',
//     };
  
//     client.request(settings).then(
//       function(data) {
//         showInfo(data);
//       },
//       function(response) {
//         showError(response);
//       }
//     );
//   }
  
  function showInfo(data) {
    var requester_data = {
      'name': data.user.name,
      'tags': data.user.tags,
      'created_at': formatDate(data.user.created_at),
      'last_login_at': formatDate(data.user.last_login_at)
    };
    var source = $("#requester-template").html();
    var template = Handlebars.compile(source);
    var html = template(requester_data);
    $("#content").html(html);
  }
  
  function showError(response) {
    var error_data = {
      'status': response.status,
      'statusText': response.statusText
    };
    var source = $("#error-template").html();
    var template = Handlebars.compile(source);
    var html = template(error_data);
    $("#content").html(html);
  }

function openModal() {
    var client = ZAFClient.init();
    client.invoke('instances.create', {
        location: 'modal',
        url: 'assets/modal.html',
        size: { // optional
            width: '80vh',
            height: '80vw'
        }
    }).then(function(modalContext) {
        // The modal is on screen now
        var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
        modalClient.on('modal.close', function() {
        // The modal has been closed
        });
    });
}