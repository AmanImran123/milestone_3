import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "../sanity/interface";
import client from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


//
export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == "blog"] | order(_createdAt desc) {
  title,
  smallDescription,
  "currentSlug": slug.current,
  titleImage,
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  return (
    <>
      <div className="my-10">

        {/* Card Parent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
          {data.map((post, idx) => (

            // Card Main
            <Card className="shadow-lg border-[1px]" key={idx}>
              <Image
                src={urlFor(post.titleImage).url()}
                alt="Error"
                width={500}
                height={500}
                className="rounded-lg h-[200px] object-cover"
              ></Image>

              {/* Card Content */}
              <CardContent className="mt-5">
                <h3 className="text-xl text-black dark:text-white font-bold line-clamp-2">{post.title}</h3>
                <p className="text-md text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">{post.smallDescription}</p>
                <Button asChild className="w-full mt-5">
                  <Link href={`/blog/${post.currentSlug}`}> Read More!</Link>
                </Button>
                <div className="flex flex-row p-2 mt-5">
                    <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/159767100?v=4" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="p-2 text-gray-600 dark:text-gray-300"> <span className="font-semibold text-black dark:text-white">By:</span> Muhammad Arsalan </p>
                </div>
              </CardContent>

            </Card>
          ))}
        </div>
        
      </div>
    </>
  );
}
