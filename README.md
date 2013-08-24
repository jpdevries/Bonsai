Bonsai
======

Responsive jQuery Tree for you and for me

## Getting Started
### Formatting HTML
Using Bonsai is easy as long as you feed it correctly formmated markup to consume. By default, each expandable item should have a 'folder' class, contain atleast one anchor tag and optionally have child folders.
Each anchor tag should have the i tags displayed below and contain a title.

```html
    <div class="bonsai">
        <ul class="section">
          <li class="folder">
            <a class="" href=""><i class="icon-caret-right"></i><i class="icon-doctype icon-columns"></i>Templates<i class="icon-chevron-sign-right"></i></a>
            <ul class="section">
              <li class="folder">
                <a class="" href=""><i class="icon-caret-right"></i><i class="icon-folder icon-doctype icon-folder-close"></i>Navigation<i class="icon-chevron-sign-right"></i></a>
                <ul class="section">
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>header<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>footer<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>navigation<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>main-nav<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>footer-open<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>footer-close<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>wrapper<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-columns"></i>body-content<i class="icon-chevron-sign-right"></i></a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="folder">
            <a class="" href=""><i class="icon-caret-right"></i><i class="icon-doctype icon-list-alt"></i>Fields<i class="icon-chevron-sign-right"></i></a>
            <ul class="section">
              <li class="folder">
                <a class="" href=""><i class="icon-caret-right"></i><i class="icon-folder icon-doctype icon-folder-close"></i>Product<i class="icon-chevron-sign-right"></i></a>
                <ul class="section">
                  <li><a href=""><i class="icon-filetype icon-doctype icon-list-alt"></i>Price<i class="icon-chevron-sign-right"></i></a></li>
                  <li><a href=""><i class="icon-filetype icon-doctype icon-list-alt"></i>Inventory<i class="icon-chevron-sign-right"></i></a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="folder">
            <a class="" href=""><i class="icon-caret-right"></i><i class="icon-doctype icon-code"></i>Snippets<i class="icon-chevron-sign-right"></i></a>
            <ul class="section">
              <li class="folder">
                <a class="" href=""><i class="icon-caret-right"></i><i class="icon-folder icon-doctype icon-folder-close"></i>getResources<i class="icon-chevron-sign-right"></i></a>
                <ul class="section">
                  <li><a href=""><i class="icon-filetype icon-doctype icon-code"></i>getResources<i class="icon-chevron-sign-right"></i></a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
```

## Using the Plugin
Call the bonsai jQuery plugin like so on the element(s) of your choice:

```js
$('.bonsai').bonsai();
````

