const sock = io();
var objects=[];

function QnaLRender(){
    
    //$(".box").load(".box");
    // $(".box").load(window.location.href + " .box" );
    console.log('hello');
        if(document.querySelector('.W')){
            console.log('questions tag being removed')
            document.querySelector('.W').parentNode.removeChild(document.querySelector('.W'));
        
        }
        while(document.querySelector('.Questions')){
            document.querySelector('.Questions').parentNode.removeChild(document.querySelector('.Questions'));
            
        }
        const div1 = document.createElement('div'); 
        div1.innerHTML=`Questions`;
        div1.classList.add('W'); 
        document.querySelector('.box').appendChild(div1); 
    console.log($('.Questions').length)
    sock.emit('list','pls send');
    console.log('request sent');
    
    
    // catch{
    //     sock.emit('list','pls send');
    //     console.log('request sent');
    // }
}
sock.on('qdata',question=>{
    console.log(question);
    // $(".box").load(".box");
       
    
   
    objects=question;
    
    uniqueId(objects).forEach(element => {
        const div = document.createElement('div'); 
        div.classList.add('Questions'); 
        div.onclick = function(){sock.emit('question needed',element);}
        div.innerHTML=`${element}`;
        document.querySelector('.box').appendChild(div);
        
    });
    
    
})

// sock.on('Adata',data=>{
    // console.log(data)
// });

sock.on('downloadIt',msg=>{
    window.open('/downloads');
});

function uniqueId(duplicates){
    var arr=[]
    duplicates.forEach(element => {
        arr.push(element.Question);
    });
    let unique = [...new Set(arr)];
    console.log(unique);
    return unique
    
}
function logout(){
    window.location.href="/user/logout";
    //window.close();
}

function NotesRender() {
    console.log('hey');
        if(document.querySelector('.W')){
            console.log('images tag being removed')
            document.querySelector('.W').parentNode.removeChild(document.querySelector('.W'));
        
        }
        while(document.querySelector('.Questions')){
            document.querySelector('.Questions').parentNode.removeChild(document.querySelector('.Questions'));
            
        }
        const div1 = document.createElement('div'); 
        div1.innerHTML=`Notes`;
        div1.classList.add('W'); 
        document.querySelector('.box').appendChild(div1); 
    console.log($('.Notes').length)
    sock.emit('note','pls send');
    console.log('requests sent!');
    
}
sock.on('dataUrl',notes=>{
    console.log(notes);
            
    objects=notes;
        
    objects.forEach(element => {
        const div = document.createElement('div'); 
        div.classList.add('Questions'); 
        div.onclick = function(){sock.emit('images needed',element.dataUrl);}
        div.innerHTML=`${element.name}`;
        document.querySelector('.box').appendChild(div);
            
    });
});

sock.on('downloadImage',msg=>{
    window.open('/downloads1');
});

