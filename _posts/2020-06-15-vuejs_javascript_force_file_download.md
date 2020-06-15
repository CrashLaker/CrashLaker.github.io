---
layout: post
title: "VueJS/Javascript force file download"
comments: true
date: "2020-06-15 20:49:04.826000+00:00"
categories:  [programming]
tags:  [vuejs, javascript]
---




```javascript
    forceFileDownload(response){
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', this.searchTerm.replace(' ', '_') + '_graph.xlsx') //or any other extension
      document.body.appendChild(link)
      link.click()
    },
    downloadXLSX: function (){
      this.axios({
        method: 'post',
        url: "/json2xlsx",
        responseType: 'arraybuffer',
        data: {
          "cols": this.classListF(),
          "rows": this.classRowsF()
        }
      })
      .then(response => {
        
        this.forceFileDownload(response)
        
      })
    },
```