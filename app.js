 //fetch json data
 
 let response = await fetch("./data.json");
 let dataJSON = await response.json();

const mainSection = document.querySelector(".container");
const replyBtn = document.querySelectorAll('.reply-btn');

let comments = JSON.parse(localStorage.getItem('comments'));

if  (!JSON.parse(localStorage.getItem('comments'))){
    comments = dataJSON.comments
}

let User = (dataJSON.currentUser)

let delReply


 let DisplayComment = comments.map(function (comment){
    
    return ` 
   
   
    <div class="comments"  data-user = ${comment.user.username} data-id= ${comment.id}>
        <div class="comments-main" >
          <div class="comments-main-header">
            
              <div class="user-info">
                <img src= ${comment.user.image.png} alt="icon">
                <p class="username">${comment.user.username}</p>
                <p class="time">${comment.createdAt}</p>
              </div>

              <button class="reply-btn"><span>
                <img src="./images/icon-reply.svg" alt="reply"></span>
                  Reply

               </button>
                    <div>
                      <p class="comment-text">
                        ${comment.content}        
                      </p>
                   </div>
             </div>
       
            
                <div class="interacting-score">
                  <button class= "plus"> 
                     <img src="./images/icon-plus.svg" alt="plus-icon">
                  </button>  
                     
                  <span>${comment.score}</span>
                  
                  <button class = "minus">  
                    <img src="./images/icon-minus.svg" alt="minus-icon">
                  </button>
                </div>
               

               
          </div>
          
            <div class = "replies-container"  data-user = ${comment.user.username} data-id= ${comment.id}>
           ${comment.replies.map(function(reply){
            
            let Button = ''
            let youIcon = ''
            let replyBtn = ` <button class="reply-btn">
                               <img src="./images/icon-reply.svg" alt="reply">Reply
                            </button>`

            if (reply.user.username == User.username){
                Button = `<div class="buttons">
                <button class="edit">Edit<img src="./images/icon-edit.svg" alt=""></button>
                <button class="delete">Delete<img src="./images/icon-delete.svg" alt=""></button>     
               </div>`  

               replyBtn = ''
               youIcon = `<p>you</p>`
            }
            return ` 
           
           <div class= 'reply' data-id = ${reply.id} data-user=${reply.user.username} >
            <div class="comments-main">
              <div class="comments-main-header">
                
                <div class="user-info">
                  <img src= ${reply.user.image.png} alt="icon">
                  <p class="username">${reply.user.username}</p>
                  <div class="you">${youIcon}</div>
                  <p class="time">${reply.createdAt}</p>
                </div>

                ${Button}

                ${replyBtn}
                      <div>
                        <p class="comment-text">
                         ${reply.content}
                          
                        </p>
                    </div>
              </div>
           
                
              <div class="interacting-score">
                  <button class="plus" ><img src="./images/icon-plus.svg" alt="plus-icon"></button>
                  <span>${reply.score}</span>
                  <button class= "minus" ><img src="./images/icon-minus.svg" alt="minus-icon"></button>
                </div>
             </div>
          
           </div>
            
          
          `
          }).join('')}
      </div>  
          </div>
    </div>
`
  
});



//add comment to
function displayCommentFunction(){
    DisplayComment.forEach(element => {
     let div = document.createElement('div');
     div.classList.add('comments')
     div.innerHTML = element
     mainSection.appendChild(div)
    });
  }; 

 displayCommentFunction()

   let commentArrId ;
  let replyArrId;
// function to add comment box on click
    mainSection.addEventListener('click', (e)=>{


  
     if (e.target.classList.contains('reply-btn')) {
        ShowCommentBox(e)
    } 
    
    else if (e.target.classList.contains('send-reply')){
      replyComment(e)
    }

    //call the function to delete comment
    else if (e.target.classList.contains('delete')){
        
           deletePrompt(e)
          delReply =
       e.target.parentElement.parentElement.parentElement.parentElement.lastElementChild
         if  (delReply.classList.contains('comments-main')){
          delReply = e.target.parentElement.parentElement.parentElement.parentElement}
          //so that we can get the current arr 
        commentArrId = delReply.parentElement.dataset.id - 1
        replyArrId = delReply.dataset.id - 1
         }    

        else if (e.target.classList.contains('edit')){
        eidtComment(e)
    }
    });

        //functionality for interactive score
        let done
      const score = [...mainSection.querySelectorAll('.interacting-score')];
        score.forEach(element => {
        element.addEventListener('click' , (e)=>{
          currentupVote = element.querySelector('span')
          
          if (e.target.parentElement.classList.contains('plus')){
            upVote(e)
          }

          else if(e.target.parentElement.classList.contains('minus')){
            downVote(e)
          }
        })
       });

    //functionality for upvote
    let currentupVote;  
      //downvote only works when upvote has happened
     function upVote(e){
     let voteVal = parseFloat(currentupVote.innerText)  
     if(!done){
      currentupVote.innerText = voteVal +  1
       done = true
    }};

    function downVote(e){
    let voteVal = parseFloat(currentupVote.innerText)  
       if(done){
         currentupVote.innerText = voteVal - 1
          done = false
        }};


    //function to show comment box

      let input
  function ShowCommentBox(e){
    let replyDestination = e.target.parentElement.parentElement.parentElement
    let replied = document.createElement('div')
    replied.classList.add('reply-comment-area' , 'newbox')


     replied.innerHTML = `
    <img src =${User.image.png}  alt="icon-person">
    <input type="text" class="reply-comment" placeholder="Add a comment...">
    <button class="send-reply">send</button>
    `

    // if comment box already there, remove otherwise add

  if (replyDestination.lastElementChild.classList.contains('reply-comment-area')){
    replyDestination.lastElementChild.remove(replied)
   }
      else replyDestination.appendChild(replied)
  };


 function eidtComment(e){
  let currInput
  let  prevReply =
   e.target.parentElement.parentElement.parentElement.parentElement
        
          //for dynamic added replies

        if(prevReply.classList.contains('replies-container')){
          prevReply = prevReply.lastElementChild
        }
   
     let text =
     prevReply.querySelector('.comment-text').textContent;
    let paragraph = prevReply.querySelector('.comment-text').parentElement
    let deleteBtn = prevReply.querySelector('.buttons')
      console.log(prevReply)
    deleteBtn.style.display = 'none'
    // to get the current array we are working on
    let  arrIndex = prevReply.parentElement.parentElement.dataset.id - 1
    let currReplyIndex = prevReply.dataset.id - 1
  
    
    paragraph.innerHTML =   ` 

      <input value="${text.trim()}" type="text" class="reply-comment edit" placeholder="Add a comment...">
     <button class="reply-btn save">update</button>
`     

 let input = prevReply.querySelector('.reply-comment')
   
    prevReply.addEventListener('click' , (e)=>{
      // save to the array and local storage 
      comments[arrIndex].replies[currReplyIndex].content = input.value
      setToLocalStorage()   
   
          //update edited comment     
      if(e.target.classList.contains('save')){
        paragraph.innerHTML = `<p class="comment-text edited"> ${input.value}` 
        deleteBtn.style.display = ""
      }
    } )
  };


        //functionality for replies
    function replyComment(e){
  let input = e.target.previousElementSibling
  let replyingTo = input.parentElement.parentElement
  let parentComment = replyingTo

    if(parentComment.classList.contains('comments')){
      parentComment = parentComment.lastElementChild.previousElementSibling
     }
    // in the case of a reply, go higher
    else if(parentComment.classList.contains('reply')){
      parentComment = replyingTo.parentElement
    }


      //inorder to get the array we are working on 

    let arrIndex = parentComment.dataset.id -1

    let replyObj = {
     id: comments[arrIndex].replies.length + 1,
    content: input.value,
    createdAt: new Date().getMinutes() +"s" + ' ago',
    score: '0',
    replyingTo: replyingTo.dataset.user,
    user : User
  }



  if (input.value == ''){
  
    input.style.border = '1px solid red'
    setTimeout((function(){
      input.style.border = ''
    }), 1000)
  }

   else if (input.value !== ''){
   
   comments[arrIndex].replies.push(replyObj)
 
   let newElem = document.createElement('div');
   newElem.classList.add('reply', 'newbox')
   newElem.dataset.id = replyObj.id
   newElem.dataset.user = User.username
      

    newElem.innerHTML = ` 

<div class= "comments-main"> 
     <div class="comments-main-header">
       
        <div class="user-info">
             <img src= ${replyObj.user.image.png} alt="icon">
              <p class="username">${replyObj.user.username}</p>
              <div class="you"><p>you</p></div>
            <p class="time">${replyObj.createdAt}</p>
        </div>

          <div>  
            <p class="comment-text">${replyObj.content}  </p>
          </div>

      </div>

        <div class="buttons">
          <button class="edit">Edit<img src="./images/icon-edit.svg" alt=""></button>
           <button class="delete">Delete<img src="./images/icon-delete.svg" alt=""></button>     
        </div>      
       
      <div class="interacting-score">
         <button class= "plus" ><img src="./images/icon-plus.svg" alt="plus-icon"></button>
         <span>${replyObj.score}</span>
         <button class= "minus" ><img src="./images/icon-minus.svg" alt="minus-icon"></button>
       </div>

  </div>


 `

     parentComment.append(newElem)
    setToLocalStorage()
    input.parentElement.remove()
   
}};



  function setToLocalStorage(){
  localStorage.setItem('comments' , JSON.stringify(comments))
  };


  function deletePrompt(){
  let div = document.createElement('div');
  div.classList.add('delete-modal');
  div.innerHTML = `
               <div class ="delete-prompt">   
                <h3> Delete comment <h3>
                  <p> Are you sure you want to delete this comment?
                      This will remove the comment and can't be
                      undone and can't be undone
                  </p>
                  <div class="prompt-btns"> 
                      <button class="cancel-btn"> no, cancel</button>
                      <button class="delete-btn"> yes, delete</button> 
                   </div>
                 <div>     `
  
          document.body.append(div);

  div.addEventListener('click' ,(e)=>{
    if(e.target.classList.contains('cancel-btn')){
        document.body.removeChild(div);
        mainSection.classList.remove('modal-bg')
    }
    else if (e.target.classList.contains('delete-btn')){
      document.body.removeChild(div);
      mainSection.classList.remove('modal-bg');
       
        //remove from document and from local storage
        delReply.remove();
        comments[commentArrId].replies.pop([replyArrId])
       setToLocalStorage()
    } 
  })};

