$('#sign-up-form').submit(function(e) {
  e.preventDefault();

  let formData = new FormData();
  // formData.append('uploadFile', $('#user-picture-input')[0].files[0]);
  formData.append('password', $('#password-input').val());
  formData.append('username', $('#username-input').val());

  // console.log($('#password-input').val());
  // console.log($('#username-input').val());
  // console.log($('#user-picture-input')[0].files[0]);
  console.log($(this).serialize());
  $.post("/login", $(this).serialize());

  // fetch('/login', {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   method: 'post',
  //   body: $(this).serialize().toString()
  // })
  // .then(response => {
  //   console.log(response);
  //   // return response.json()
  // })
  // .then(data => {
  //   console.log(data);
  // })
});
