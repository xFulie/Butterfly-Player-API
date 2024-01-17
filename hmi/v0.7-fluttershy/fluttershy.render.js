function html(name, attrs, ...children){
  // Create the HTML element
  const el = document.createElement(name)

  // for each attribute, set it on the element
  // if attribute is "disabled", "checked", "selected", or "open", send "el.<attr_name> = !!attrs[attr_name]"
  // remember: !!0 == false, !!1 == true, !!"" == false, !!"true" == true, !!"false" == true
  // if attribute is any other string, send "el.setAttribute(attrName, attrs[attrName])"
  for(const attrName in attrs){
    switch(attrName){
      case "disabled":
      case "checked":
      case "selected":
      case "open":
        el[attrName] = !!attrs[attrName]
        if(attrs[attrName]) el.setAttribute(attrName, "")
      default:
        el.setAttribute(attrName, attrs[attrName])
    }
  }

  // for each child provided, append it to the element, from start to end
  for(const child of children) {
    if(child) {
      if(typeof child == "string") el.innerHTML = child
      else el.appendChild(child)
    }
  }

  return el;
}