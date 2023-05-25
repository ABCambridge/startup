[notes reference file](./notes.md)

# Selectors
* element: just the element type name (h1, p, main, etc.)
    * combinators: 
        * ex: "body section" any section that is a descendant of a body
        * ex: "section > p" any p that is a direct descendant of a section
        * ex: "p ~ div" any p that has a div sibling
        * ex: "p + div" any p that has an adjacent div sibling
* class: preceded class name with a dot (.message)
    * conbinators:
        * precede class by element. ex: "p.summary" all paragraphs with a class of summary
* id: precede id with a # (#mainScreen)
* attribute selector: ex: p[class='summary']
    * get any p with a class of summary
    * you can select just that it has an attribute, or that the attribute actually has a certain value
* pseudo selector: es: section:hover
    * allows seletion when the section is hovered over