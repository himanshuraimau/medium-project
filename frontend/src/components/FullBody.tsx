import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";
import { Blog } from "../hooks";

export const FullBody = ({ blog }: { blog: Blog }) => {
    const authorName = blog.author?.name || "Anonymous";

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl">
                    <div className="col-span-8 bg-red-200">
                        <div className="text-3xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 pt-2">
                            Posted on 34 Feb
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-800 text-lg">
                            Author
                        </div>
                        <div className="flex">
                            <div className="pr-2 flex flex-col justify-center">
                                <Avatar name={authorName} />
                            </div>
                            <div className="text-xl font-bold">
                                {authorName}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random Phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
