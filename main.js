//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'sumithere'
// GET REQUEST
function getTodos() {
  axios({
    method : 'get',
    url : 'https://jsonplaceholder.typicode.com/todos',
    params : {
      _limit : 10,
    }
  })
  .then(res=> showOutput(res))
  .catch(err=>console.log(err))
}

// POST REQUEST
function addTodo() {
  axios.post("https://jsonplaceholder.typicode.com/todos",
    {
      
      title: "quis ut nam facilis et officia qui sumit work",
      "completed": false
    })
    .then(res=>showOutput(res))
    .catch(err=>console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch("https://jsonplaceholder.typicode.com/todos/1",{
    completed:true,
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete("https://jsonplaceholder.typicode.com/todos/12")
  .then(res => showOutput(res))
  .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([axios.get("https://jsonplaceholder.typicode.com/todos/?_limit=5"),axios.get("https://jsonplaceholder.typicode.com/posts/?_limit=10")])
  .then(([todo,post])=>showOutput(todo))
  .catch(err=>console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers : {
      'Content-Type':'application/json',
      Authorization : 'djskdsikbhjkfdk',
    }
  }

  axios.post("https://jsonplaceholder.typicode.com/todos/",{
    body : "sumit here",
  },headers)
  .then(res=>showOutput(res))
  .catch(error=>console.log(error))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  
  const config = {
    method : 'post',
    url : "https://jsonplaceholder.typicode.com/todos/",
    data : {
      body : "sumit here",
    },
    transformResponse : axios.defaults.transformResponse.concat(data => {
      data.body = data.body.toUpperCase();
      return data
    })
  }

  axios(config)
  .then(data=>showOutput(data))
  .catch(error=>console.log(error))
}

// ERROR HANDLING
function errorHandling() {
  axios.get("https://jsonplaceholder.typicode.com/tosdos/")
  .then(data=>showOutput(data))
  .catch(error => {
    if(error.response){
      console.log(error.response.status)
      console.log(error.response)

      if(error.response.status === 404)
      {
        alert(`${error.response.config.url} not find`)
      }
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  
  const source = axios.CancelToken.source();

  axios.get("https://jsonplaceholder.typicode.com/todos/",{
    cancelToken : source.token,
  })
  .then(res => showOutput(res))
  .catch( thrown => {
    if(axios.isCancel(thrown)){
      console.log(thrown.message)
    }
  })

  if(false==false){
    source.cancel("nhi chalana hai")
  }
}

// INTERCEPTING REQUESTS & RESPONSES

// axios.interceptors.request.use(config => {
//   console.log(`${JSON.stringify(config)} send to ${config.url}`)
// }, error => {
//    console.log(error)
// })

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
