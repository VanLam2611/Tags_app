const ul = document.querySelector('ul'),
input = ul.querySelector('input'),
countTag = document.querySelector('.total span'),
removeTag = document.querySelector('.footer button');

let maxTags = 10
let tags = []

function getCountTag(){
    countTag.innerHTML = maxTags - tags.length;
}
getCountTag()
function creatTag(){
    //remove all li tags before adding
    ul.querySelectorAll('li').forEach(li => li.remove())
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class='bx bx-x' onclick="remove(this,'${tag}')"></i></li>`
        ul.insertAdjacentHTML('afterbegin', liTag)
    })
}

function remove(element, tag){
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    element.parentElement.remove()
    getCountTag()
}

function addTags(e){
    if(e.key == 'Enter'){
        let tag = e.target.value.replace(/\s+/g, '')
        if(tag.length > 1 && !tags.includes(tag)){
            if(tags.length < 10){
                tag.split(',').forEach(tag => {
                    tags.push(tag);
                    creatTag()
                });
            }
        }
        e.target.value = ''
        getCountTag()
    }
}

input.addEventListener('keyup', addTags)

removeTag.addEventListener('click', ()=>{
    tags.length = 0
    ul.querySelectorAll('li').forEach(li => li.remove())
    getCountTag()
})