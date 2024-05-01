import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const sortedBlogs = loading ? [] : [...blogs].reverse(); // Reverse blogs array if not loading

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div>
                    {loading ? (
                         <div className="flex flex-col">
                             <BlogSkeleton/>
                             <BlogSkeleton/>
                             <BlogSkeleton/>
                             <BlogSkeleton/>
                             <BlogSkeleton/>
                         </div>
                    ) : (
                        sortedBlogs.map(blog => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id} 
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"1 MAY 2024"} 
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
