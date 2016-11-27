# Ebook Generator
#### _changelog & history_

This ebook generator is meant to simplify the efforts required to publish an ebook in different formats, starting with just a base set of .docx files.

It takes advantage of [Pandoc] to convert between file formats, and uses grunt to perform its tasks as well as for compiling assets like css and images used in the ebook.

For more information, please take a look at the [**project's Wiki**](http://github.com/Libedizioni/ebook-generator/wiki)

Author: [Codice Ovvio](https://github.com/codiceovvio) | [Libe Edizioni](http://www.libedizioni.it)

***

**v0.4.2**
- fix publisher logo image margins
- update black color defaults, styles for titles, dialogues and text color
- add custom ebook initial styles to scss files

**v0.4.1**
- fix typo error in pandoc command
- add monospace & dialogue TAGS and styles

**v0.4.0**

- _New Features:_
    - add TOC title to yaml metadata block
    - add font-face sass mixin
    - add rules for cover image

- _Updates:_
    - intro structure and output
    - book-config-sample.json
    - layout and images styles
    - base font size to device's default
    - grunt shell intro parsing task
    - markdown process & epub build scripts
    - all pandoc build commands in .sh scripts

- _Bug fixes:_
    - small issues in scss font-face mixin
    - responsive_images task size & alias
    - small scripts typos & various layout issues
    - sass-lint to allow 'mm' & 'pt' unit lenghts
    - intro section(s) with newly defined tags

**v0.3.0**

- fix: refactor all .docx tags and markdown edits parsing to avoid clashes in tags syntax
- fix: correct intro txt files

**v0.2.4**

- fix: add warning to readme
- update: add search_replace_intro to "sources" grunt alias and some defaults to css

**v0.2.3**

- fix: cleanup .scss files & update version tags
- update: simplify book scaffolding with book-config-sample instead of book-config.json
- fix: correct files copy & better readme formatting

**v0.2.2**

- fix small issues in README.md
- add a set of docx tags according to those [listed in Wiki](https://github.com/Libedizioni/ebook-generator/wiki/Docx-Formatting-Shortcuts) to process-markdown-edits script
- fix docx tags for intro .txt files
- add minimal text-formatting css styles

**v0.2.1**

- fix README.md formatting issue

**v0.2.0**

- update README.md contents
- add links to docs at repository's Wiki

**v0.1.2**

- fix assets grunt aliases ordering
- update and add new docx tags

**v0.1.1**

- fix grunt aliases & tasks
- update build pdf script & task
- add git remote to book-config

**v0.1.0**

- initial working version
- alpha stage, without customizations
