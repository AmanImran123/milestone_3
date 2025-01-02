import Image from "next/image";
import { fullBlog } from "../../../sanity/interface";
import SanityClient from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PortableText } from "next-sanity";



export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
   *[_type == "blog" 
  && slug.current == '${slug}'] 
{
  "currentSlug": slug.current,
  title,
  titleImage,
  smallDescription,
  content,
}[0]`;

  const data = await SanityClient.fetch(query);
  return data;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  return (
    <div className="max-w-7xl mx-auto my-10 justify-center items-center text-center">

      {/* Container */}
      <div className="container">
         
        {/* Author Text */}
        <div className="flex justify-center items-center flex-row p-2">
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/159767100?v=4"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="p-2 text-gray-600 dark:text-gray-300">
            {" "}
            <span className="font-semibold text-black dark:text-white">
              By:
            </span>{" "}
            Muhammad Arsalan{" "}
          </p>
        </div>
        {/* Author Text Ends! */}
        <div className="flex flex-col mt-5 mx-auto justify-center items-center text-center">
         <h1 className="text-center block text-3xl leading-8 tracking-tight
          font-bold text-black dark:text-white sm:text-5xl">{data.title}</h1>
          <Image className="my-5 rounded-lg 
          object-cover shadow-sm shadow-black dark:shadow-white dark:shadow-sm"
           src={urlFor(data.titleImage).url()} alt="Error" width={800} height={800}></Image>
           {/* Content */}
           <div className="mt-10 w-full max-w-96 sm:max-w-[500px] md:max-w-screen-md 
           mx-5 sm:mx-16 md:mx-auto text-center sm:text-left
           prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary">
            <PortableText value={data.content} />
           </div>
        </div>
      </div>
    </div>
  );
}
