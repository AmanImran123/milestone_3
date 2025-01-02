import { defineType } from "sanity"

export default defineType({
   name:"blog",
   type: "document",
   title: "Blog",
   fields:[
      {
         name:'title',
         type:'string',
         title:'Title'
      },
      {
         name:'slug',
         type:'slug',
         title:'Slug of your blog article',
         options:{
            source:'title',
         }
      },
      {
         name:'titleImage',
         type:'image',
         title:'Upload your image'
      },
      {
         name:'smallDescription',
         type:'text',
         title:'Meta Description'
      },
      {
         name:'content',
         type:'array',
         title:'Content',
         of: [
            {
               type:'block'
            }
         ]
      },
   ]
});