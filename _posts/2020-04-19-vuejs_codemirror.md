---
layout: post
title: "VueJs Codemirror"
comments: true
date: "2020-04-19 15:30:09.215000+00:00"
categories:  [programming]
tags:  [vuejs, codemirror]
---




https://github.surmon.me/vue-codemirror/

`npm install vue-codemirror --save`

```vuejs
import VueCodemirror from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)
``` 

```vuejs
<template>
  <div class="codemirror">
    <div v-if="code != null">
        <codemirror style="text-align:left;height:100%;" v-model="code" :options="cmOption"></codemirror>
    </div>

  <!-- or to manually control the datasynchronization（或者手动控制数据流，需要像这样手动监听changed事件） -->
  <!--<codemirror ref="myCm"
              :value="code" 
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange">
  </codemirror>-->
  </div>
</template>
<script>

  // language

  // theme css
  //import 'codemirror/theme/base16-dark.css'
  //import 'codemirror/theme/solarized.css'
  import 'codemirror/theme/monokai.css'
  import 'codemirror/mode/python/python.js'
  import 'codemirror/mode/yaml/yaml.js'


  // active-line.js
  import 'codemirror/addon/selection/active-line.js'

  // styleSelectedText
  import 'codemirror/addon/selection/mark-selection.js'
  import 'codemirror/addon/search/searchcursor.js'

  // highlightSelectionMatches
  import 'codemirror/addon/scroll/annotatescrollbar.js'
  import 'codemirror/addon/search/matchesonscrollbar.js'
  import 'codemirror/addon/search/searchcursor.js'
  import 'codemirror/addon/search/match-highlighter.js'

  // keyMap
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/addon/edit/matchbrackets.js'
  import 'codemirror/addon/comment/comment.js'
  import 'codemirror/addon/dialog/dialog.js'
  import 'codemirror/addon/dialog/dialog.css'
  import 'codemirror/addon/search/searchcursor.js'
  import 'codemirror/addon/search/search.js'
  import 'codemirror/keymap/sublime.js'
  import 'codemirror/keymap/vim.js'

  // foldGutter
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/brace-fold.js'
  import 'codemirror/addon/fold/comment-fold.js'
  import 'codemirror/addon/fold/foldcode.js'
  import 'codemirror/addon/fold/foldgutter.js'
  import 'codemirror/addon/fold/indent-fold.js'
  import 'codemirror/addon/fold/markdown-fold.js'
  import 'codemirror/addon/fold/xml-fold.js'

import _ from 'lodash'

function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
}
  export default {
    data() {
      return {
        code: null,
        firstLoad: true,
        cmOption: {
          tabSize: 4,
          foldGutter: true,
          autoCloseBrackets: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          keyMap: "vim",
          //mode: 'text/x-vue',
          //mode: 'text/x-csrc',
          mode: 'text/x-python',
          //theme: 'base16-dark',
          //theme: 'solarized light',
          theme: 'monokai',
          extraKeys: {
            'F11'(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            Tab: betterTab
            //'Esc'(cm) {
            //  if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            //}
          }
        }
      }
    },
    mounted(){
        this.loadData()
    },
    methods: {
      onCmCursorActivity(codemirror) {
        //console.log('onCmCursorActivity', codemirror)
      },
      onCmReady(codemirror) {
        //console.log('onCmReady', codemirror)
      },
      onCmFocus(codemirror) {
        //console.log('onCmFocus', codemirror)
      },
      onCmBlur(codemirror) {
        //console.log('onCmBlur', codemirror)
      },
      saveCode: _.debounce((obj) => {
          //console.log('saving code', code)
          if (obj.firstLoad){
            obj.firstLoad = false
            return
          }
          if (obj.code == null) return
          let doc = {
              'path': obj.$route.path,
              'doc': obj.code
          }
          obj.axios.put('http://docker:7777', doc)
      }, 2000),
      loadData(path = null){
          if (this.$route.path == '/') return

          let doc = {
              'path': (path == null) ? this.$route.path : path
          }
          this.code = null
          this.axios.post('http://docker:7777', doc).then((rs) => {
              //console.log('load data', rs.data)
              this.firstLoad = true
              this.code = rs.data.body
          })
      }
    },
    watch: {
        $route(to, from) {
          this.loadData(to.path)
        },
        code: function (){
            //console.log('changed')
            this.saveCode(this)
        }
    }
  }
</script>


<style>
.CodeMirror {
    height:100vh !important;
}

</style>
```

![](/assets/img/_pZqBxwuB_9e3db235f49759db63120a8cfd2c49d5.png)
*/home/coder/project/dopad/node_modules/codemirror/keymap/vim.js*

![](/assets/img/_pZqBxwuB_e6c660726c68fd880004e827115afcf2.png)
*/home/coder/project/dopad/node_modules/codemirror/keymap/vim.js*