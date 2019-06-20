// const oReq = new XMLHttpRequest();
//       oReq.onload = function() {
//         const response = JSON.parse(this.responseText);
//         console.log(response)
//       }

//       oReq.open(
//         'get',
//         'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs',
//         true
//       )
//       oReq.send();

const posts = (function () {
  const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs'

  return {
    sendSearch: function () {
      const searchTerm = document.querySelector('#searchTerm').value
      fetch(url + `?search=${searchTerm}`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        const searchResult = document.querySelector('#searchResult')
        const result = json.map(item => (
          `<li>${item.title}</li>`
        )).join("")

        searchResult.innerHTML = result
      })
    },
    getPosts: function () {
      fetch(url)
        .then(response => response.json())
        .then(posts => {
          const blogWrapper = document.querySelector('#demo')
          posts = posts.map(post => {
            const capitalLetter = post.title.charAt(0).toUpperCase()
            const title = `<h2 class="blog-post-title">${capitalLetter + post.title.slice(1)}</h2>`
            
            const body = `<p>${post.body}</p>`
            const date = new Date(post.createdAt)
            const meta = `<p class="blog-post-meta">${date.toLocaleString()}</p>`
            const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis, eros in rutrum posuere, purus mi efficitur mauris, sit amet cursus lacus neque a eros. Vivamus massa est, placerat et nulla sit amet, venenatis porttitor felis. Sed egestas convallis urna sit amet fermentum. Fusce purus dui, mollis eget purus ut, viverra lobortis neque. Vivamus lorem leo, rutrum vel nunc a, dignissim tempor nisi. Fusce metus ante, rhoncus porta vehicula faucibus, pharetra vitae sapien. Etiam pulvinar risus sem, et pharetra libero accumsan eu. Vivamus et luctus nulla. Praesent non sem ac mi iaculis ultricies quis et lacus. Donec tempus libero elit, vel porttitor diam semper congue.'
            const blogPost = `<div class="blog-post">${title}${meta}</hr>${body}${lorem}</div>`
            return blogPost
          }).splice(0,4)
          .join("")
          blogWrapper.innerHTML = posts
        })
    }
  }
})()

const search = (function () {
  return {
    openSearch: function () {
      document.querySelector('#searchLink')
        .addEventListener('click', (event) => {
          let form = document.querySelector('#searchBox > div')
          let input = document.querySelector('#searchBox > div > input')
          let submitSearch = document.querySelector('#submitSearch')
          
          form.style.display = 'block'
          form.animate(
            [
              // keyframes
              { transform: "translateX(150px)" },
              { transform: "translateX(0px)" }
          ],
          {
              // timing options
              duration: 300,
              iterations: 1
          }
          )
          input.focus()

          submitSearch.addEventListener('click', () => {
            posts.sendSearch()
          })
        })
    }
  }
}())

search.openSearch()

posts.getPosts()
