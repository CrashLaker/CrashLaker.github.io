---
layout: post
title: "Vue-tables2 Pagination"
comments: true
date: "2020-11-17 03:07:29.492000+00:00"
---


```html
<template>
    <div id="cardwrapper">

        <table style="border-collapse:collapsed;table-layout:fixed;">
            <tr>
                <td width="500px;">
                    <vuetable-pagination-info ref="paginationInfoTop"
                    ></vuetable-pagination-info>
                </td>
                <td>
                    <vuetable-pagination ref="paginationTop"
                        @vuetable-pagination:change-page="onChangePage"
                        :css="css.pagination"
                    ></vuetable-pagination>
                </td>
            </tr>
        </table>


        <table style="border-collapse:collapsed;table-layout:fixed;">
            <tr>
                <td width="500px;">
                    <vuetable-pagination-info ref="paginationInfo"
                    ></vuetable-pagination-info>
                </td>
                <td>
                    <vuetable-pagination ref="pagination"
                        @vuetable-pagination:change-page="onChangePage"
                        :css="css.pagination"
                    ></vuetable-pagination>
                </td>
            </tr>
        </table>
    </div>
</template>


<script>
import VuetablePagination from './vuetable/VuetablePagination'
import VuetablePaginationInfo from './vuetable/VuetablePaginationInfo'
import css from "./vue-table-css.js";


export default {
    name: 'card-wrapper',
    props: {

    },
    components: {
        VuetablePagination,
        VuetablePaginationInfo
    },
    data(){
        return {
            formLayout: {},
            css,
            paginationData: {
                current_page: 1,
                from: 1,
                last_page: 180,
                per_page: 10,
                to: 10,
                total: 1795
            },
        }
    },
    mounted(){
        this.setPaginationData(this.paginationData)
    },
    methods:{
        setPaginationData(paginationData){
            this.$refs.paginationTop.setPaginationData(paginationData);
            this.$refs.paginationInfoTop.setPaginationData(paginationData);
            this.$refs.pagination.setPaginationData(paginationData);
            this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage(page) {
            if (page == 'next'){
                this.paginationData.current_page += 1
            }else if(page == 'prev'){
                this.paginationData.current_page -= 1
            }else{
                this.paginationData.current_page = page
            }
            this.setPaginationData(this.paginationData)
            console.log('onChangePage', page)
        },
    }
}
</script>


<style>
.part {
    float:left;
}
.monitor-nav > .part > * {
    margin:5px;
}
.monitor-nav > .part > button {
    /*width:90px;*/
    min-width:40px;
    height:20px;
    line-height:2px;
}
.grayBG {
    background-color: lightgray !important;
}
</style>
```

![](/assets/img/whodVLI0t_096518e517d3e5b6f08704dec9b73a47.png)














