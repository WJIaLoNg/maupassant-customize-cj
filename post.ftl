<#include "module/macro.ftl">
<@layout title="${post.title!} - ${blog_title!}">
    <div class="post">
        <h1 class="post-title">${post.title!}</h1>
        <div class="post-meta">${post.createTime?string["yyyy年MM月dd日"]!}<span> | </span>
            <#if (post.categories)?? && post.categories?size !=0>
                <#list post.categories as categorie>
                    <span class="category"><a href="${categorie.fullPath!}">${categorie.name!}</a></span>
                </#list>
            </#if>
            
        </div>

        <#--  正文  -->
        <div class="post-content">
            ${post.formatContent!}
        </div>

        <#if (post.tags)?? && post.tags?size !=0>
            <#include "module/tag.ftl"/>
        </#if>

        <#--  分页  -->
        <div class="post-nav">
            <#if prevPost??>
                <a class="pre" href="${prevPost.fullPath!}">${prevPost.title!}</a>
            </#if>

            <#if nextPost??>
                <a class="next" href="${nextPost.fullPath!}">${nextPost.title!}</a>
            </#if>
        </div>

        <#--  评论模块  -->
        <@global.comment target=post type="post" />
    </div>
</@layout>