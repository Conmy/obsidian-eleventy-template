# Obsidian and Eleventy Template

Use this template to create an Obsidian vault that can be published as a static site.

The repo uses Eleventy as a static site generator, converting markdown files
into html "posts" that are then organized like a blog.

## Folder Structure

### .obsidian

This is the folder that holds Obsidian configuration files. Obsidian will manage these files based on
changes made while using the Obsidian application.

### public

Store static content from here. Eleventy will not process these files any further

### src

The place for all notes to live inside your Obsidian vault. These will be processed and turned into HTML
posts by the eleventy processor before publishing.

#### src/_includes

This is a folder for eleventy templates. These can be referenced as layout templates in markdown front-matter
to style and display site information in different ways.

#### src/posts

This is the main place to put notes while using Obsidian. These pages will be turned into HTML pages by
eleventy during site pre-processing.

### templates

A location for Obsidian template pages. These will not be hosted but can be used inside Obsidian
to create notes pages.
They can include front-matter that will be processed by Eleventy when it is creating the static site

## :eyes: Preview The Site

To preview what the site will look like, you can do the following:

- Install node
- Run `npm install`
- Run `npm run dev`

A preview of the site will be available locally on <http://localhost:8080/>
