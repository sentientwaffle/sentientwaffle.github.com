---
layout: post
title: Save file on blur
---

## Intro
When doing web development, I frequently need to switch back and
forth between the editor and a browser to see the updates.
This simple plugin will save the file whenever it loses focus.

## [The Code][repo]

    stratus = require 'stratus'
    stratus.on "fractus.blur", (editor) ->
      editor.save()

_3 whole lines._ Not bad.

The `fractus.blur` event is called whenever an editor loses focus, and
the callback receives that editor.

### By Bundle
If you want to apply the bundle to only CSS, Sass, and Stylus files:

    stratus.on "fractus.blur", (editor) ->
      syntax = editor.syntax?.name
      return unless syntax && /^(CSS|Sass|Stylus)\b/.test(syntax)
      editor.save()

## Installing the plugin

    $ stratus plugin:install <username> path/to/your/plugin.coffee

## More info
For more information on writing plugins for Stratus,
see the [plugin API][plugins].

A configurable version of the save-on-blur plugin is available
on [GitHub][repo].

There are [plenty of other useful events][events] you can use.

[plugins]: http://stratuseditor.com/plugins
[events]:  http://stratuseditor.com/plugins#Events
[repo]:    https://github.com/sentientwaffle/save-on-blur
