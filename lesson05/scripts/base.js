const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');


button.addEventListener('click', function(){
    if (input.value !== ''){
        let listCount = list.getElementsByTagName('li').length;
        if (listCount < 10){
            const li = document.createElement('li');
            const deleteButton = document.createElement('button');
            li.textContent = input.value;
            deleteButton.textContent = '❌';
            li.append(deleteButton);
            list.append(li);
            deleteButton.addEventListener('click', function (){
                list.removeChild(li);
                input.focus();
            });
            input.focus();
            input.value = '';
        }
        else{
            input.value = '';
        }
    }
    else{
        return input.focus();
    }

});