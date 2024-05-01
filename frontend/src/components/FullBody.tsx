import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";
import { Blog } from "../hooks";

export const FullBody = ({ blog }: { blog: Blog }) => {
    const authorName = blog.author?.name || "Anonymous";

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 gap-6 px-6 md:px-10 w-full max-w-7xl">
                    <div className="col-span-8 bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                        <p className="text-sm text-gray-500 mb-4">Posted on 1 May</p>
                        <div className="text-lg text-gray-800 leading-relaxed">{blog.content}</div>
                    </div>
                    <div className="col-span-4 bg-gray-100 rounded-lg shadow-md p-6">
                        <div className="text-xl font-semibold mb-4">Author</div>
                        <div className="flex items-center mb-4">
                            <Avatar name={authorName} />
                            <div className="ml-3 text-lg font-medium">{authorName}</div>
                        </div>
                        <p className="text-gray-600">Random phrase about the author's ability to grab the user's attention.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
