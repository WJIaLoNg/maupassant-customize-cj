<#include "module/macro.ftl"/>
<@layout title="分类列表 - ${blog_title!}">
    <div class="post">
        <h1 class="post-title">分类列表</h1>
        <div class="post-content">

            <#--        <div class="tagcloud">-->
            <#--            <@categoryTag method="list">-->
            <#--                <#list categories as category>-->
            <#--                    <a href="/categories/#${category.name!}" title="${category.name!}" rel="${category.postCount!}">${category.name!}</a>-->
            <#--                </#list>-->
            <#--            </@categoryTag>-->
            <#--        </div>-->

            <div class="one-tag-list">
                <@categoryTag method="list">
                    <#list categories as category>
                        <div>
                            <a class="fa fa-folder category-name category-text" href="/categories/${category.slug!}"
                               title="${category.name!}" rel="${category.postCount!}">&nbsp;&nbsp;${category.name!}</a>
                        </div>
                    </#list>
                </@categoryTag>
            </div>

        </div>
    </div>

</@layout>