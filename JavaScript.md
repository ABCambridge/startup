[notes reference file](./notes.md)

### Make sure to use 'use strict'; at the top of all your JS.
# Manipulating the DOM
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

# Event handlers
* you can add your event handlers to your HTML by using JS rather than directly in the HTML.

# This pointer
* a function's this pointer is usually that of its owning object, but global functions don't have an owning object, so it is undefined.