
document.querySelector('button').addEventListener('click', getFetch)
document.getElementById('next').addEventListener('click', getNext)


let count = 0
let maxArt

function getNext(){
  count = Math.ceil(Math.random() * maxArt)
  console.log(maxArt)
  getFetch()
}

function getFetch(){
  const subject = document.querySelector('input').value.toLowerCase()
  
  const url =`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${subject}`
   fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        console.log(data) //go

        const painting = data.objectIDs
        maxArt = painting.length

        if(count >= painting.length){       //this restarts the array if user reaches the end
          count = 0
        }
        
        
        console.log(painting)
 
          return fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${painting[count]}`)
        
          .then(response => response.json())
          .then(data2 =>{

          console.log(data2)
           
          let artistName = data2.artistDisplayName

          if (artistName === ""){
            artistName = "unknown"
          }

          document.querySelector('h1').innerText = `"${data2.title}\"`
          document.querySelector('h3').innerText = `${artistName}, ${data2.objectDate}`
          document.querySelector('img').src = data2.primaryImage
          
          if(data2.isPublicDomain == false){
            document.querySelector('div').style.display = 'block'
            document.querySelector('h2').innerText = 'no image available, art not in public domain'
            document.querySelector('img').style.display = 'none'
          }else{
            document.querySelector('div').style.display = 'none'
            document.querySelector('img').style.display = 'block'
          }
          })
      })

      .catch(err => {
          console.log(`error ${err}`)
      });    
}


// 'https://collectionapi.metmuseum.org/public/collection/v1/objects/544118'