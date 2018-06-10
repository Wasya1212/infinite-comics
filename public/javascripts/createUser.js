let $signUpForm = $('form');

$signUpForm.submit(e => {
  e.preventDefault();

  let formData = new FormData();
  formData.append('uploadFile', $('#user-picture-input')[0].files[0]);
  formData.append('password', $('#password-input').val());
  formData.append('username', $('#username-input').val());

  console.log($('#password-input').val());
  console.log($('#username-input').val());
  console.log($('#user-picture-input')[0].files[0]);

  fetch('/user', {
    method: 'post',
    headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'multipart/form-data'
    },
    body: formData
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
