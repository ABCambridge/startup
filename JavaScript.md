[notes reference file](./notes.md)

# Notes on manipulating the DOM
* querySelector type functions allows you to grab all elements of a certin type
* get by Id and get by element are also available
* both of the above save you from constantly manually walking through the DOM tree
* setting the element.innerHTML equal to new HTML allows you to inject different HTML, although this is the incorrect way to do it.
* ### Example Correct DOM manipulation
```
    function insertChild(selector, text){
        const newChild = document.createElement('div');
        newChilde.textContent = text;
        const parentElement = document.querySelector(selector);
        parentElement.appendChild(newChild); 
        }
```