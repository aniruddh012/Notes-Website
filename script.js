let container = document.querySelector('.container');
let addBtn = document.querySelector('.addBtn');

const updateLSDate = ()=>{
    const textareaData=document.querySelectorAll('textArea');
    const content=[];
    textareaData.forEach((note)=>{
        content.push(note.value);
    })
    localStorage.setItem('content',JSON.stringify(content))
    
    const headData=document.querySelectorAll('.inp');
    const tittle=[];
    headData.forEach((note)=>{
        tittle.push(note.value);
    })
    localStorage.setItem('tittle',JSON.stringify(tittle))
}
let addNote = (text='', head='' ) => {
    let note = document.createElement('div');
    note.innerHTML = `               <div class="divBtn">
<button class="edit"><i class="fas fa-edit"></i></button>
<button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<input placeholder='Tittle' class='inp ${head? 'hidden' : ''}' type="text">
<h4 class="heading ${head? '' : 'hidden'}"></h4>
<div class="main ${text? '' : 'hidden'}"></div>
<textarea placeholder='Query' class='${text? 'hidden' : ''}'></textarea>`;
    note.classList.add('note');
    container.appendChild(note);

    let deleteBtn = note.querySelector('.delete');
    let editBtn = note.querySelector('.edit');
    let inp = note.querySelector('.inp');
    let heading=note.querySelector('.heading');
    let mainDiv=note.querySelector('.main');
    let textarea=note.querySelector('textarea');

    deleteBtn.addEventListener('click', ()=>{
        note.remove();
        updateLSDate();
    })

    textarea.value=text;
    mainDiv.innerHTML=text;
    inp.value=head;
    heading.innerHTML=head;

    inp.addEventListener('change',()=>{
        head=event.target.value;
        heading.innerHTML=head;
        updateLSDate();
    })

    textarea.addEventListener('change',()=>{
        text=event.target.value;
        mainDiv.innerHTML=text;
        updateLSDate();
    })

    editBtn.addEventListener('click',()=>{
        inp.classList.toggle('hidden');
        heading.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
        mainDiv.classList.toggle('hidden');
    })

    let search=document.querySelector('.search');
search.addEventListener('input', ()=>{
        if(mainDiv.innerHTML.includes(event.target.value) | heading.innerHTML.includes(event.target.value) ){
            note.style.display=''
        }
        else{
            note.style.display='none'
        }
})

}

const contentD=JSON.parse(localStorage.getItem('content'));
const tittleD=JSON.parse(localStorage.getItem('tittle'));
if(contentD,tittleD){
    for(let i=0; i<contentD.length; i++){
        for(let f=0; f<tittleD.length; f++){
            addNote(contentD[i],tittleD[f]);
            i++;
        }
    }
}





addBtn.addEventListener('click', () => addNote());