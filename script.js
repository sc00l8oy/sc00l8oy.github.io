class Data {
  static postObjects = []

  static Load() {
    var xhttp = new XMLHttpRequest()
    let self = this
    xhttp.onload = function() {
      if (this.status == 200) {
        let posts = JSON.parse(this.responseText)
        for (let post of posts) {
          self.postObjects.push(new Post(post))
        }
        self.Display(self.postObjects)
      }
    }
    xhttp.open("GET", "https://raw.githubusercontent.com/sc00l8oy/DI/main/posts.json", true)
    xhttp.send()
  }

  static Display(posts) {
    const main = document.getElementById('main')
    for (let post of posts) {
      main.appendChild(post.toHtml())
    }
  }
}


class Post {
  constructor(serverPost) {
    this.id = serverPost.id
    this.description = serverPost.description
    this.username = serverPost.username
    this.first_name = serverPost.first_name
    this.last_name = serverPost.last_name
    this.avatar = serverPost.avatar
    this.like_count = serverPost.like_count
    this.share_count = serverPost.share_count
    this.comment_count = serverPost.comment_count
    this._element = null
    this._likeElement = null
  }

  toHtml() {
    let container = document.createElement('div')
    container.className = 'post'
    container.id = 'post_'+this.id
    container.innerHTML = '<img src="'+ this.avatar +'"><a href="#">@'+ this.username +'</a><p>'+ this.description +'</p>'

    let buttonsContainer = document.createElement('div')
    let likeButton = document.createElement('button')
    let self = this
    likeButton.addEventListener('click', function () { self.like() })
    likeButton.innerText = 'Like ('+ this.like_count +')'
    buttonsContainer.appendChild(likeButton)
    // buttonsContainer.innerHTML += '<button>Share ('+ this.share_count +')</button>' +
    //   '<button>Comment ('+ this.comment_count +')</button>'
    container.appendChild(buttonsContainer)

    this._element = container
    this._likeElement = likeButton

    return container
  }

  like() {
    this.like_count++
    this._likeElement.innerText = 'Like ('+this.like_count+')'
    toast('You liked a post with id: ' + this.id)
  }
}

Data.Load()


