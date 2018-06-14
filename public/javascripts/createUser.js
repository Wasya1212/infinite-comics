$('form.sing-up').on('submit', function(e) {
  e.preventDefault();

  let formData = new FormData();
  // formData.append('uploadFile', $('#user-picture-input')[0].files[0]);
  formData.append('password', $('#password-input').val());
  formData.append('username', $('#username-input').val());

  // console.log($('#password-input').val());
  // console.log($('#username-input').val());
  // console.log($('#user-picture-input')[0].files[0]);
  console.log($(this).serialize());
  fetch('/user', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    method: 'post',
    body: $(this).serialize()
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
});
